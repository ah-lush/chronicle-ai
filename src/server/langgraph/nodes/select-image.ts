import { createAdminClient } from "@/lib/supabase/admin";
import type { AgentStateType } from "../state";
import { updateJobStatus } from "../tools/database.tool";

export async function selectImageNode(
  state: AgentStateType
): Promise<Partial<AgentStateType>> {
  try {
    await updateJobStatus({
      jobId: state.jobId,
      status: "REVIEWING",
      currentStep: "Selecting images for the article",
      progress: 95,
    });

    const researchData = state.researchData!;
    const articleId = state.articleId!;

    console.log(
      `\n📊 Processing ${researchData.length} research articles for images`
    );

    const allImages: string[] = [];
    let coverImage: string | undefined;

    for (let i = 0; i < researchData.length; i++) {
      const article = researchData[i];

      if (article.main_image) {
        console.log(`   ✅ Adding main image to collection`);
        allImages.push(article.main_image);
      }

      if (article.images && article.images.length > 0) {
        console.log(`   ✅ Adding ${article.images.length} additional images`);
        article.images.forEach((img, idx) => {
          console.log(`      ${idx + 1}. ${img}`);
        });
        allImages.push(...article.images);
      }
    }

    const uniqueImages = [...new Set(allImages)].filter((img) => {
      try {
        const url = new URL(img);
        const isValid = url.protocol === "http:" || url.protocol === "https:";
        if (!isValid) {
          console.log(`❌ Invalid protocol: ${img}`);
        }
        return isValid;
      } catch (error) {
        console.log(`❌ Invalid URL: ${img}`);
        return false;
      }
    });

    if (uniqueImages.length > 0) {
      coverImage = uniqueImages[0];
      const articleImages = uniqueImages.slice(0, 6);

      articleImages.forEach((img, idx) => {
        console.log(`      ${idx + 1}. ${img}`);
      });

      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("articles")
        .update({
          cover_image: coverImage,
          article_images: articleImages,
        })
        .eq("id", articleId)
        .select();

      if (error) {
        console.error(`❌ Database update failed:`, error);
        throw error;
      }

      await updateJobStatus({
        jobId: state.jobId,
        status: "COMPLETED",
        currentStep: "Article completed with images",
        progress: 100,
      });

      return {
        articleData: {
          ...state.articleData!,
          coverImage,
          articleImages: articleImages,
        },
        completed: true,
      };
    } else {
      console.log("\n⚠️  No valid images found, completing without images");

      await updateJobStatus({
        jobId: state.jobId,
        status: "COMPLETED",
        currentStep: "Article completed (no images found)",
        progress: 100,
      });

      return {
        completed: true,
      };
    }
  } catch (error) {
    console.error("\n❌ Image selection failed:", error);

    await updateJobStatus({
      jobId: state.jobId,
      status: "COMPLETED",
      currentStep: "Article completed (image selection had issues)",
      progress: 100,
    });

    return {
      completed: true,
    };
  }
}
