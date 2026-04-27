import GenericPage from "@/components/generic-page";

export default function PrivacyPage() {
  const sections = [
    {
      title_ar: "جمع البيانات",
      title_en: "Data Collection",
      content_ar: "نقوم بجمع المعلومات الضرورية فقط لتسهيل عملية حجز العقارات، بما في ذلك الاسم، بيانات الاتصال، ونسخ من وثائق الهوية الرسمية التي ترفعها لغرض التحقق.",
      content_en: "We collect only strictly necessary information to facilitate property bookings, including name, contact details, and copies of official ID documents you upload for verification purposes."
    },
    {
      title_ar: "حماية المعلومات",
      title_en: "Information Security",
      content_ar: "نستخدم تقنيات تشفير (SSL) متقدمة لحماية بياناتك. يتم تخزين الوثائق الحساسة في حاويات تخزين آمنة ومعزولة (Supabase Storage) مع صلاحيات وصول صارمة.",
      content_en: "We use advanced SSL encryption to protect your data. Sensitive documents are stored in secure, isolated storage containers (Supabase Storage) with strict access permissions."
    },
    {
      title_ar: "مشاركة البيانات",
      title_en: "Data Sharing",
      content_ar: "إيوان لا تبيع بياناتك لأطراف ثالثة. يتم مشاركة بيانات الزيارة فقط مع ملاك العقارات المعنيين أو الوكلاء المعتمدين لترتيب المعاينة.",
      content_en: "Iwan does not sell your data to third parties. Viewing data is shared only with relevant property owners or authorized agents to arrange the viewing."
    },
    {
      title_ar: "حقوق المستخدم",
      title_en: "User Rights",
      content_ar: "لديك الحق الكامل في الوصول إلى بياناتك، تصحيحها، أو طلب حذفها من منصتنا في أي وقت من خلال لوحة التحكم الخاصة بك.",
      content_en: "You have the full right to access, correct, or request the deletion of your data from our platform at any time through your dashboard."
    }
  ];

  return (
    <GenericPage 
      title_ar="سياسة الخصوصية" 
      title_en="Privacy Policy"
      sections={sections}
    />
  );
}
