<template>
  <v-app>
    <v-main class="bg-background">
      <v-container class="py-10">
        <v-row justify="center">
          <v-col cols="12" md="8">
            <!-- كرت الإدخال -->
            <v-card class="pa-6 rounded-lg elevation-12" color="surface">
              <v-card-title class="text-h4 text-center font-weight-bold text-primary mb-4">
                🎬 صانع الأفلام والقصص التلقائي
              </v-card-title>
              
              <v-card-subtitle class="text-center text-subtitle-1 mb-6">
                اكتب قصتك وسيناريو المشاهد لتقوم الأداة بإنشاء فيديو احترافي بصوت مصري ومؤثرات سينمائية مجاناً!
              </v-card-subtitle>

              <!-- حقل النص -->
              <v-textarea
                v-model="storyText"
                label="أدخل تفاصيل المشاهد والقصة هنا..."
                placeholder="مثال: المشهد الأول: مكتب عمر الساعة 2:00 صباحاً..."
                rows="10"
                variant="outlined"
                color="primary"
                class="mb-4"
                no-resize
              ></v-textarea>

              <v-row>
                <!-- اختيار المعلق الصوتي -->
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="selectedVoice"
                    :items="voices"
                    item-title="label"
                    item-value="value"
                    label="المعلق الصوتي المصري"
                    variant="outlined"
                    color="primary"
                  ></v-select>
                </v-col>
                
                <!-- نوع التوليد -->
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="ratio"
                    :items="['16:9 (فيديو أفقي للـ YouTube)', '9:16 (فيديو عمودي للـ Reels/Shorts)']"
                    label="أبعاد الفيديو ومقاسات الشاشة"
                    variant="outlined"
                    color="primary"
                    disabled
                  ></v-select>
                </v-col>
              </v-row>

              <!-- زر التوليد السحري -->
              <v-btn
                :loading="store.loading"
                color="primary"
                size="x-large"
                block
                class="mt-4 font-weight-bold"
                @click="startGenerating"
              >
                توليد الفيديو النهائي الآن ✨
              </v-btn>
            </v-card>

            <!-- حالة المعالجة الحالية -->
            <v-alert
              v-if="store.loading || store.progressMessage || store.errorMessage"
              class="mt-6"
              :type="store.errorMessage ? 'error' : 'info'"
              variant="tonal"
              border="start"
            >
              {{ store.errorMessage ? store.errorMessage : store.progressMessage }}
              <v-progress-linear
                v-if="store.loading"
                color="primary"
                indeterminate
                class="mt-3"
              ></v-progress-linear>
            </v-alert>

            <!-- مشغل ومعاينة الفيديو النهائي -->
            <v-card v-if="store.videoUrl" class="mt-8 pa-4 text-center rounded-lg" color="surface">
              <v-card-title class="text-h5 text-primary mb-4 font-weight-bold">
                🔮 فيديو القصة جاهز للمشاهدة والنشر!
              </v-card-title>
              
              <div class="video-container d-flex justify-center">
                <video 
                  controls 
                  :src="store.videoUrl" 
                  class="rounded-lg shadow-2xl"
                  style="max-width: 100%; max-height: 500px;"
                ></video>
              </div>

              <v-btn
                :href="store.videoUrl"
                download="final_story.mp4"
                target="_blank"
                color="success"
                class="mt-4 font-weight-bold"
                prepend-icon="mdi-download"
              >
                تحميل الفيديو بجودة كاملة MP4
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useStoryStore } from './stores/storyStore'

const store = useStoryStore()

const storyText = ref('')
const selectedVoice = ref('ar-EG-ShakirNeural') // القيمة الافتراضية
const ratio = ref('9:16 (فيديو عمودي للـ Reels/Shorts)')

const voices = [
  { label: 'شاكر (صوت رجالي - غموض ورعب وإثارة)', value: 'ar-EG-ShakirNeural' },
  { label: 'سلمى (صوت نسائي - سرد قصص حياتية وتفاعلي)', value: 'ar-EG-SalmaNeural' }
]

const startGenerating = () => {
  if (!storyText.value.trim()) {
    alert('من فضلك ضع تفاصيل القصة أو المشاهد أولاً!')
    return
  }
  store.generateStoryVideo(storyText.value, selectedVoice.value)
}
</script>

<style>
/* تلميع إضافي لتحسين المظهر */
.v-application {
  font-family: 'Cairo', sans-serif !important;
}
</style>