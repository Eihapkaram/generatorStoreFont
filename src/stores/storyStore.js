import { defineStore } from "pinia";
import axios from "axios";

export const useStoryStore = defineStore("story", {
  state: () => ({
    videoUrl: null,
    loading: false,
    errorMessage: "",
    progressMessage: "",
  }),
  actions: {
    async generateStoryVideo(storyText, voiceType) {
      this.loading = true;
      this.videoUrl = null;
      this.errorMessage = "";
      this.progressMessage =
        "يرجى الانتظار... جاري قراءة القصة وتحليلها بواسطة الذكاء الاصطناعي 🧠";

      try {
        // إرسال الطلب مع الهيدرز لحل مشكلة ngrok و CORS
        const response = await axios.post(
          "https://partridgelike-undelusively-gael.ngrok-free.dev/api/generate-story",
          {
            story_text: storyText,
            voice: voiceType,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              // الهيدر السحري لتخطي صفحة تحذير ngrok التي تعطل الـ API وتسبب الـ CORS
              "ngrok-skip-browser-warning": "true",
            }
          }
        );

        if (response.data.success) {
          this.videoUrl = response.data.video_url;
          this.progressMessage = "تم الانتهاء من دمج وتوليد الفيديو بنجاح! 🎉";
        } else {
          this.errorMessage = "حدث خطأ غير متوقع أثناء إخراج الفيديو.";
        }
      } catch (error) {
        this.errorMessage =
          error.response?.data?.error || "فشل الاتصال بخادم المعالجة.";
        console.error("Error details:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
