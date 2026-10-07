import React, { useState } from 'react';
import {
  MessageCircle,
  X,
  Video,
  Package,
  Sparkles,
  Send,
  Globe2,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const FloatingWhatsApp: React.FC = () => {
  const { language, setIsOrderTrackingOpen } = useShop();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const WHATSAPP_PHONE = '919014036564';

  const topics = [
    {
      id: 'video_call',
      icon: Video,
      title: {
        en: 'Video Call Request',
        te: 'లైవ్ వీడియో కాల్ అభ్యర్థన',
        hi: 'वीडियो कॉल अनुरोध',
      },
      subtitle: {
        en: 'Inspect pure silk shine, zari & border live on video',
        te: 'చీర మెరుపు, జరీ మరియు అంచులను లైవ్ వీడియోలో చూడండి',
        hi: 'साड़ी की चमक, ज़री और बॉर्डर को लाइव वीडियो पर देखें',
      },
      waMessage:
        '*Namaste Gundamma Collections!* 🌸📹\n\nI would like to request a live video call consultation to inspect your authentic silk sarees. Please let me know your available time slots today. Thank you!',
    },
    {
      id: 'order_help',
      icon: Package,
      title: {
        en: 'Order Help & Customization',
        te: 'ఆర్డర్ సహాయం & ఫాల్/పీకో',
        hi: 'ऑर्डर सहायता एवं फॉल-पिको',
      },
      subtitle: {
        en: 'Check existing order, dispatch status, or custom fall & pico',
        te: 'ఆర్డర్ స్థితి, డెలివరీ లేదా ఫాల్-పీకో వివరాలు తెలుసుకోండి',
        hi: 'ऑर्डर स्थिति या कस्टम फॉल और पिको की जानकारी प्राप्त करें',
      },
      waMessage:
        '*Namaste Gundamma Collections!* 📦🌸\n\nI need assistance regarding an order / custom fall & pico stitching. Please connect me with your boutique desk.',
    },
    {
      id: 'bridal_consult',
      icon: Sparkles,
      title: {
        en: 'Bridal & Muhurtham Pattu',
        te: 'పెళ్లి పట్టు చీరల సలహా',
        hi: 'दुल्हन मुहूर्त साड़ी परामर्श',
      },
      subtitle: {
        en: 'Personalized heirloom styling for wedding muhurtham',
        te: 'పెళ్లి ముహూర్తం కోసం రాయల్ పట్టు చీరల ఎంపిక',
        hi: 'विवाह मुहूर्त के लिए शाही रेशम साड़ियों का चयन',
      },
      waMessage:
        '*Namaste Gundamma Collections!* 👰✨\n\nI am planning for an upcoming wedding and would like recommendations for authentic Bridal Kanchipuram / Banarasi pattu sarees. Could you share your latest bridal catalogue?',
    },
    {
      id: 'shipping_inquiry',
      icon: Globe2,
      title: {
        en: 'Worldwide Shipping & Delivery',
        te: 'అంతర్జాతీయ కొరియర్ వివరాలు',
        hi: 'अंतर्राष्ट्रीय शिपिंग जानकारी',
      },
      subtitle: {
        en: 'Delivery timelines & rates to USA, UK, UAE & across India',
        te: 'విదేశాలకు మరియు భారతదేశమంతటా సురక్షిత రవాణా',
        hi: 'भारत एवं विदेश (USA, UK, UAE) सुरक्षित कूरियर विवरण',
      },
      waMessage:
        '*Namaste Gundamma Collections!* ✈️🌸\n\nCould you please share details regarding insured shipping timelines and courier charges to my location?',
    },
  ];

  const handleLaunchWhatsApp = (messageText: string) => {
    const encoded = encodeURIComponent(messageText);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`, '_blank');
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;
    const greeting =
      language === 'te'
        ? '*నమస్కారం గుండమ్మ కలెక్షన్స్!* 🌸\n\n'
        : language === 'hi'
        ? '*नमस्ते गुंडम्मा कलेक्शंस!* 🌸\n\n'
        : '*Namaste Gundamma Collections!* 🌸\n\n';
    handleLaunchWhatsApp(`${greeting}${customMessage.trim()}`);
    setCustomMessage('');
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 ${
        isChatOpen ? '' : 'animate-float'
      }`}
    >
      {/* Expanded Mini-Chat Interface */}
      {isChatOpen ? (
        <div className="w-[calc(100vw-3rem)] sm:w-96 bg-white dark:bg-[#180c12] border border-amber-900/20 dark:border-amber-500/25 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-200 flex flex-col max-h-[85vh]">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-amber-950 via-[#701a2b] to-amber-950 text-amber-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-serif font-bold text-sm shadow-md">
                  గ
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-amber-950" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-royal text-sm font-bold tracking-wide">
                    Gundamma Concierge
                  </h3>
                  <span className="text-[9px] px-1.5 py-0.2 bg-amber-400/20 text-amber-300 rounded font-mono">
                    ONLINE
                  </span>
                </div>
                <p className="text-[10px] text-amber-200/80 font-sans-clean">
                  Jubilee Hills, Hyderabad · Replies in &lt; 5 mins
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1.5 text-amber-200 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="p-4 space-y-3.5 overflow-y-auto flex-1 bg-amber-50/30 dark:bg-stone-950/40 text-xs">
            {/* Assistant Welcome Bubble */}
            <div className="flex gap-2.5 items-start max-w-[90%]">
              <div className="w-6 h-6 rounded-full bg-amber-700 text-white flex items-center justify-center text-[10px] font-serif shrink-0 mt-0.5">
                గ
              </div>
              <div className="p-3 rounded-2xl rounded-tl-sm bg-white dark:bg-[#201018] border border-amber-900/10 dark:border-amber-500/15 shadow-sm text-stone-800 dark:text-stone-200 space-y-1.5 leading-relaxed font-sans-clean">
                <p>
                  {language === 'te'
                    ? 'నమస్కారం! గుండమ్మ కలెక్షన్స్‌కు స్వాగతం. మీ పూజ లేదా పెళ్లిళ్ల కోసం అసలైన చేనేత పట్టు చీరను ఎంచుకోవడంలో మీకు ఎలా సహాయపడగలం?'
                    : language === 'hi'
                    ? 'नमस्ते! गुंडम्मा कलेक्शंस में आपका स्वागत है। आपके शुभ अवसरों एवं विवाह के लिए शुद्ध रेशम साड़ी चुनने में हम आपकी कैसे सहायता कर सकते हैं?'
                    : 'Namaste! Welcome to Gundamma Collections. How may our handloom curators assist you today?'}
                </p>
                <div className="text-[10px] text-stone-400 font-mono flex items-center gap-1 pt-1 border-t border-stone-100 dark:border-stone-800">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Silk Mark Authenticated Loom Master</span>
                </div>
              </div>
            </div>

            {/* Quick Topic Chips Heading */}
            <div className="pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 font-royal block mb-2">
                {language === 'te'
                  ? 'ప్రధాన అంశాలు ఎంచుకోండి:'
                  : language === 'hi'
                  ? 'विषय चुनें:'
                  : 'Select an Assistance Topic:'}
              </span>

              {/* Topics Grid */}
              <div className="space-y-2">
                {topics.map(topic => {
                  const Icon = topic.icon;
                  const isSelected = selectedTopic === topic.id;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => {
                        setSelectedTopic(topic.id);
                        handleLaunchWhatsApp(topic.waMessage);
                      }}
                      className="w-full text-left p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1f1017] hover:border-amber-600 dark:hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/30 transition-all flex items-start gap-2.5 group cursor-pointer shadow-xs"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-stone-900 dark:text-stone-100 text-xs group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                            {topic.title[language] || topic.title.en}
                          </h4>
                          <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight mt-0.5">
                          {topic.subtitle[language] || topic.subtitle.en}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* In-chat quick helper to Track Order directly */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsChatOpen(false);
                  setIsOrderTrackingOpen(true);
                }}
                className="w-full py-2 px-3 rounded-lg bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 text-center font-medium hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <Package className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  {language === 'te'
                    ? 'మీ ఆర్డర్ స్థితిని ఇక్కడ ట్రాక్ చేయండి'
                    : language === 'hi'
                    ? 'यहाँ अपना ऑर्डर ट्रैक करें'
                    : 'Track Existing Order Status Here'}
                </span>
              </button>
            </div>
          </div>

          {/* Custom Message Composer Footer */}
          <form
            onSubmit={handleCustomSend}
            className="p-3 bg-white dark:bg-[#180c12] border-t border-stone-200 dark:border-stone-800 space-y-2"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={
                  language === 'te'
                    ? 'మీ సందేశం టైప్ చేయండి...'
                    : language === 'hi'
                    ? 'अपना संदेश टाइप करें...'
                    : 'Type a custom question...'
                }
                value={customMessage}
                onChange={e => setCustomMessage(e.target.value)}
                className="w-full pl-3 pr-10 py-2.5 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-600 font-sans-clean"
              />
              <button
                type="submit"
                disabled={!customMessage.trim()}
                className="absolute right-1.5 p-1.5 bg-[#25D366] hover:bg-[#1EBE5D] disabled:opacity-40 text-white rounded-md transition-colors cursor-pointer"
                title="Send via WhatsApp"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-stone-400">
              <button
                type="button"
                onClick={() =>
                  handleLaunchWhatsApp(
                    '*Namaste Gundamma Collections!* 🌸 I am browsing your online boutique and would like to speak directly with a saree specialist.'
                  )
                }
                className="hover:text-emerald-700 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1"
              >
                <span>Direct WhatsApp: +91 9014036564</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
              <span>Instant Launch</span>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/* Tooltip speech bubble when collapsed */}
          {showTooltip && (
            <div className="relative bg-white dark:bg-[#1f1017] border border-amber-900/20 dark:border-amber-500/20 rounded-lg shadow-xl p-3 max-w-xs text-xs text-stone-800 dark:text-stone-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute top-1.5 right-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                aria-label="Close message"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-1.5 font-bold text-amber-950 dark:text-amber-300 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Gundamma Concierge</span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 pr-3">
                {language === 'te'
                  ? 'నమస్కారం! పట్టు చీరల వీడియో కాల్ లేదా ఆర్డర్ కోసం వాట్సాప్‌లో మాట్లాడండి.'
                  : language === 'hi'
                  ? 'नमस्ते! रेशमी साड़ियों के वीडियो कॉल या ऑर्डर के लिए व्हाट्सएप पर बात करें।'
                  : 'Namaste! Need a video call demo or order help? Tap to chat with us.'}
              </p>
            </div>
          )}

          {/* Floating Action Button toggles mini-chat */}
          <button
            onClick={() => {
              setIsChatOpen(true);
              setShowTooltip(false);
            }}
            className="group relative p-3.5 sm:p-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Open Gundamma WhatsApp Concierge Chat"
            title="Chat with Gundamma Collections"
          >
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white dark:border-stone-900" />
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
          </button>
        </>
      )}
    </div>
  );
};
