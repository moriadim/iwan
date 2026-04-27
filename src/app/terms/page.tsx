import GenericPage from "@/components/generic-page";

export default function TermsPage() {
  const sections = [
    {
      title_ar: "قبول الشروط",
      title_en: "Acceptance of Terms",
      content_ar: "باستخدامك لمنصة إيوان، فإنك تقر بأنك قرأت وفهمت وتوافق على الالتزام بشروط الاستخدام هذه وكافة القوانين المعمول بها في الإمارات والسعودية.",
      content_en: "By using the Iwan platform, you acknowledge that you have read, understood, and agree to be bound by these terms of use and all applicable laws in the UAE and KSA."
    },
    {
      title_ar: "حجز المعاينات",
      title_en: "Property Viewings",
      content_ar: "تعد طلبات الزيارة المقدمة عبر المنصة 'طلبات مبدئية' وتخضع لموافقة مالك العقار أو الوكيل. يجب تقديم هوية سارية المفعول لمعالجة أي طلب.",
      content_en: "Viewing requests submitted through the platform are considered 'preliminary requests' and are subject to the approval of the property owner or agent. A valid ID must be provided to process any request."
    },
    {
      title_ar: "دقة المعلومات",
      title_en: "Information Accuracy",
      content_ar: "نسعى جاهدين لضمان دقة معلومات العقارات المعروضة، ومع ذلك فإننا لا نتحمل المسؤولية عن أي تغييرات تطرأ على الأسعار أو توفر الوحدات من قبل الملاك.",
      content_en: "We strive to ensure the accuracy of the displayed property information; however, we do not assume responsibility for any changes in prices or unit availability made by owners."
    },
    {
      title_ar: "السلوك المقبول",
      title_en: "Acceptable Use",
      content_ar: "يُحظر استخدام المنصة لأي غرض غير قانوني أو محاولة الوصول غير المصرح به إلى بيانات المستخدمين الآخرين أو أنظمة الشركة.",
      content_en: "It is prohibited to use the platform for any illegal purpose or to attempt unauthorized access to other users' data or the company's systems."
    }
  ];

  return (
    <GenericPage 
      title_ar="الشروط والأحكام" 
      title_en="Terms & Conditions"
      sections={sections}
    />
  );
}
