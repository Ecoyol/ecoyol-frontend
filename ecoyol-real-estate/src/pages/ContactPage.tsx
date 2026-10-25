import { useState } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { PageHeader, WhatsAppButton } from '@/components/ui';

export function ContactPage() {
  const { lang } = useLang();
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
  };

  return (
    <>
      <PageHeader
        eyebrow={lang === 'ar' ? 'اتصل بنا' : 'Contact'}
        title={lang === 'ar' ? 'تواصل مع فريق إيكويول' : 'Get in touch with the Ecoyol team'}
        subtitle={
          lang === 'ar'
            ? 'سعداء بالإجابة على أسئلتك — سواء كنت تبحث عن عقار أو تمثل مكتبًا عقاريًا.'
            : 'We are happy to answer your questions — whether you are looking for a property or represent a real estate office.'
        }
      />

      <section className="py-16 sm:py-20">
        <div className="container-app grid gap-10 lg:grid-cols-[1fr_400px]">
          <div>
            {sent ? (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
                <CheckCircle2 className="h-10 w-10 text-green-600" aria-hidden />
                <h2 className="text-lg font-semibold text-charcoal-900">
                  {lang === 'ar' ? 'تم استلام رسالتك' : 'Message received'}
                </h2>
                <p className="max-w-sm text-sm text-charcoal-600">
                  {lang === 'ar'
                    ? 'شكرًا لتواصلك. هذا نموذج أولي — لم تُرسل رسالتك فعليًا، وسيتم ربط النموذج بخدمة حقيقية في مرحلة لاحقة.'
                    : 'Thank you for reaching out. This is a prototype — your message was not actually sent, and the form will be connected to a real service later.'}
                </p>
                <button onClick={() => setSent(false)} className="btn-outline mt-2">
                  {lang === 'ar' ? 'إرسال رسالة أخرى' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="rounded-2xl border border-charcoal-100 bg-white p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-charcoal-900">
                  {lang === 'ar' ? 'أرسل رسالة' : 'Send a message'}
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-charcoal-600">
                      {lang === 'ar' ? 'الاسم' : 'Name'}
                    </span>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field"
                      placeholder={lang === 'ar' ? 'اسمك الكامل' : 'Your full name'}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-charcoal-600">
                      {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </span>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field"
                      placeholder="name@example.com"
                      dir="ltr"
                    />
                  </label>
                </div>
                <label className="mt-4 block">
                  <span className="mb-1 block text-xs font-medium text-charcoal-600">
                    {lang === 'ar' ? 'الرسالة' : 'Message'}
                  </span>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="input-field resize-y"
                    placeholder={lang === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
                  />
                </label>
                <button type="submit" className="btn-gold mt-6 min-h-[48px] w-full sm:w-auto">
                  <Send className="h-4 w-4" aria-hidden />
                  {lang === 'ar' ? 'إرسال الرسالة' : 'Send message'}
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-4">
            <WhatsAppButton className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2" />

            <div className="rounded-2xl border border-charcoal-100 bg-white p-6">
              <h2 className="font-semibold text-charcoal-900">
                {lang === 'ar' ? 'معلومات التواصل' : 'Contact information'}
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-charcoal-700">
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-gold-600" aria-hidden />
                  <span dir="ltr">+964 XXX XXX XXXX</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-gold-600" aria-hidden />
                  hello@ecoyol.iq
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-gold-600" aria-hidden />
                  {lang === 'ar' ? 'بغداد، العراق' : 'Baghdad, Iraq'}
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 shrink-0 text-gold-600" aria-hidden />
                  {lang === 'ar' ? 'الأحد – الخميس، 9 صباحًا – 5 مساءً' : 'Sun – Thu, 9am – 5pm'}
                </li>
              </ul>
              <p className="mt-4 rounded-xl bg-charcoal-50 p-3 text-xs leading-relaxed text-charcoal-500">
                {lang === 'ar'
                  ? 'ملاحظة: بيانات التواصل تجريبية ضمن النموذج الأولي وسيتم تحديثها بالبيانات الفعلية.'
                  : 'Note: contact details are placeholders in this prototype and will be updated with real information.'}
              </p>
            </div>

            <div className="rounded-2xl border border-charcoal-100 bg-charcoal-950 p-6 text-white">
              <h2 className="font-semibold">
                {lang === 'ar' ? 'لمكاتب العقارات' : 'For real estate offices'}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-300">
                {lang === 'ar'
                  ? 'إذا كنت تمثل مكتبًا عقاريًا وترغب في الانضمام إلى المنصة، اذكر ذلك في رسالتك وسيتواصل معك الفريق.'
                  : 'If you represent a real estate office and want to join the platform, mention it in your message and the team will follow up.'}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
