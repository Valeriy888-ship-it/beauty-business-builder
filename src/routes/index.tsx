import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import heroPortrait from "@/assets/valeriy-pankov.png.asset.json";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Наставничество для косметологов",
          provider: { "@type": "Person", name: "Валерий Панков" },
          areaServed: "RU",
          description:
            "Программа наставничества для соло-косметологов и владельцев небольших кабинетов: реанимация базы, внедрение CRM, скрипты консультаций, стабильный трафик.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Сколько стоит наставничество?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Стоимость обсуждается индивидуально на бесплатной 20-минутной диагностике — после того, как я разберусь с вашей ситуацией и пойму, какой формат работы подходит именно вам.",
              },
            },
            {
              "@type": "Question",
              name: "У меня очень мало клиентов. Это подходит?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Да. Первый этап работы — реанимация базы: даже 30–50 контактов могут дать быструю выручку без вложений в рекламу. Мы начинаем не с трафика, а с того, что уже есть.",
              },
            },
            {
              "@type": "Question",
              name: "Я боюсь поднимать цены — клиенты уйдут.",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Работаем со скриптами обоснования ценности. Цена — производная от системы, а не от смелости. Когда клиент видит структуру услуги, вопрос стоимости уходит на второй план.",
              },
            },
            {
              "@type": "Question",
              name: "У вас медицинское образование?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Нет, я не косметолог. Я инженер, который построил и вывел на систему косметологический салон. Моя зона — бизнес-процессы, финансы, продажи, автоматизация. Медицинскую часть вы уже знаете сами.",
              },
            },
            {
              "@type": "Question",
              name: "Что если результата не будет?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Если за 2 месяца системной работы вы не выходите на ориентир 150 000 ₽, я продолжаю сопровождение бесплатно до достижения цели. Условие — вы выполняете шаги плана.",
              },
            },
            {
              "@type": "Question",
              name: "Сколько времени в неделю это займёт?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "От 3 до 5 часов в неделю на первом этапе. Дальше — меньше: система должна работать без вашего постоянного участия.",
              },
            },
          ],
        }),
      },
    ],
  }),
});

/* ─────────────────────────── PAGE ─────────────────────────── */

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Method />
        <Audience />
        <About />
        <Cases />
        <Testimonials />
        <Program />
        <Process />
        <Numbers />
        <Guarantee />
        <Faq />
        <CtaForm />
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}

/* ─────────────────────────── NAV ─────────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#method", label: "Метод" },
    { href: "#about", label: "Кто я" },
    { href: "#cases", label: "Кейсы" },
    { href: "#program", label: "Программа" },
    { href: "#faq", label: "Вопросы" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-[background,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-hairline"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-editorial flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 text-[0.82rem] tracking-[0.22em] uppercase font-medium">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          Панков System
        </a>
        <nav aria-label="Основная навигация" className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.88rem] text-ink-soft hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#cta" className="btn-cta text-[0.85rem] px-5 py-2.5">
          Бесплатный разбор
        </a>
      </div>
    </header>
  );
}

/* ─────────────────────────── HERO ─────────────────────────── */

function Hero() {
  return (
    <section id="top" className="relative soft-grain overflow-hidden">
      <div className="container-editorial pt-14 md:pt-24 pb-16 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow fade-up">Наставничество для косметологов · Россия</p>
            <h1 className="mt-6 text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.4rem] fade-up fade-up-delay-1">
              Система, при&nbsp;которой кабинет
              <br />
              <span className="italic text-accent">работает</span> без хаоса.
            </h1>
            <p className="mt-8 max-w-xl text-[1.05rem] md:text-[1.12rem] leading-relaxed text-ink-soft fade-up fade-up-delay-2">
              Помогаю соло-косметологам и владельцам небольших кабинетов выйти на стабильный
              доход <span className="text-foreground font-medium">150 000+ ₽</span> за&nbsp;2&nbsp;месяца —
              без найма сотрудников и без слива бюджета на рекламу. Инженерный подход, а не мотивация.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4 fade-up fade-up-delay-3">
              <a href="#cta" className="btn-cta">
                Записаться на бесплатный разбор
                <span aria-hidden>→</span>
              </a>
              <a href="#method" className="btn-ghost">Как это работает</a>
            </div>

            <p className="mt-6 text-[0.82rem] text-muted-foreground fade-up fade-up-delay-4">
              20 минут · без обязательств · веду разбор лично
            </p>
          </div>

          <div className="lg:col-span-5 relative fade-up fade-up-delay-2">
            <div className="relative aspect-[4/5] w-full max-w-[440px] ml-auto">
              <div className="absolute -inset-3 rounded-[28px] bg-surface -z-10" aria-hidden />
              <img
                src={heroPortrait.url}
                alt="Валерий Панков — бизнес-наставник для косметологов, инженер"
                width={1024}
                height={1536}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover rounded-[22px]"
              />
              <div className="absolute -bottom-5 -left-5 bg-background border border-hairline rounded-2xl px-4 py-3 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)]">
                <p className="eyebrow">Валерий Панков</p>
                <p className="mt-1 text-[0.9rem] leading-tight">
                  Инженер · 5 лет в бьюти-бизнесе
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* stats strip */}
        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 hairline-top pt-10">
          {[
            { k: "150 000+ ₽", v: "Целевой доход учениц" },
            { k: "2 месяца", v: "До первого результата" },
            { k: "89%", v: "Возвращаемость клиентов" },
            { k: "0 → 1 млн", v: "Вывод собственного салона" },
          ].map((s, i) => (
            <div key={i} className="fade-up" style={{ animationDelay: `${i * 80 + 200}ms` }}>
              <p className="numeric text-3xl md:text-4xl font-medium tracking-tight">{s.k}</p>
              <p className="mt-2 text-[0.85rem] text-muted-foreground max-w-[180px]">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── MARQUEE ─────────────────────────── */

function Marquee() {
  const items = [
    "Реанимация базы",
    "CRM без хаоса",
    "Скрипты консультаций",
    "Обоснование цены",
    "Возврат «спящих» клиентов",
    "Финансовая модель",
    "Стабильная запись",
    "Автоматизация напоминаний",
  ];
  return (
    <section aria-hidden className="hairline-top hairline-bottom bg-surface/60 overflow-hidden">
      <div className="container-editorial py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.78rem] tracking-[0.14em] uppercase text-muted-foreground">
        {items.map((it, i) => (
          <span key={i} className="inline-flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-hairline" />
            {it}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── METHOD ─────────────────────────── */

function Method() {
  const steps = [
    {
      k: "01",
      title: "Пожар",
      subtitle: "Быстрые деньги за 14 дней",
      body:
        "Реанимируем базу — тех клиентов, которые уже вас знают, но перестали приходить. Не покупаем внимание, возвращаем оплаченное. Без вложений в рекламу.",
      metric: "+30–50% к доходу за 14 дней",
    },
    {
      k: "02",
      title: "Фундамент",
      subtitle: "Система удержания",
      body:
        "CRM, скрипты консультаций, автоматические напоминания, регламент допродаж. Кабинет перестаёт быть решетом: до 40% повторных клиентов, которые раньше тихо уходили, остаются.",
      metric: "89% возвращаемость",
    },
    {
      k: "03",
      title: "Этажи",
      subtitle: "Стабильный поток и масштаб",
      body:
        "Настраиваем предсказуемый входящий поток. Не «наливаем трафик», а достраиваем каналы, которые окупаются с первого визита. Запись на 3 недели вперёд без вашего постоянного участия.",
      metric: "Запись на 3 недели",
    },
  ];

  return (
    <section id="method" className="container-editorial py-24 md:py-36">
      <RevealBlock>
        <p className="eyebrow">Метод</p>
        <h2 className="mt-5 text-4xl md:text-6xl max-w-3xl">
          Сначала <span className="italic text-accent">тушим пожар</span>. Потом строим фундамент.
          Потом надстраиваем этажи.
        </h2>
        <p className="mt-6 max-w-2xl text-ink-soft text-[1.02rem] leading-relaxed">
          Нельзя лить трафик в кабинет, где течёт база. Нельзя строить систему на пустом счету.
          Порядок этапов — не эстетика, а инженерная необходимость.
        </p>
      </RevealBlock>

      <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline hairline-top hairline-bottom">
        {steps.map((s, i) => (
          <RevealBlock
            key={s.k}
            as="article"
            className="bg-background p-8 md:p-10 min-h-[340px] flex flex-col"
            delay={i * 120}
          >
            <span className="numeric text-[0.8rem] tracking-[0.2em] text-muted-foreground">{s.k}</span>
            <h3 className="mt-8 text-3xl md:text-4xl">{s.title}</h3>
            <p className="mt-2 text-[0.95rem] text-accent font-medium tracking-tight">{s.subtitle}</p>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-soft flex-1">{s.body}</p>
            <p className="mt-6 pt-5 hairline-top text-[0.85rem] numeric">
              <span className="text-muted-foreground">Результат этапа · </span>
              <span className="text-foreground">{s.metric}</span>
            </p>
          </RevealBlock>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── AUDIENCE ─────────────────────────── */

function Audience() {
  const cards = [
    {
      title: "Мастер-ремесленник в малом городе",
      pain: "«День сурка, безденежье, страх показаться алчной.»",
      note: "Работаете одна, часто на дому. Сарафанное радио молчит неделями.",
    },
    {
      title: "Выгоревший эксперт",
      pain: "«Денег много, а жизни нет. Хочу зарабатывать умом, а не руками.»",
      note: "7–15 лет опыта. Спина уже отказывает, доход привязан к рукам.",
    },
    {
      title: "Владелец студии в хаосе",
      pain: "«Всё рухнет без моего контроля. Бюджет уходит в ноль.»",
      note: "2–3 кабинета, наёмные мастера. Бизнес живёт только пока вы в нём.",
    },
    {
      title: "Совместитель · найм + косметология",
      pain: "«Боюсь остаться без денег, если уйду из найма.»",
      note: "Медик, подрабатывающий косметологом. Рвётесь между дежурствами.",
    },
    {
      title: "Новичок после курсов",
      pain: "«Синдром самозванца, страх осуждения близких.»",
      note: "Диплом есть, базы почти нет. Боитесь назвать цену.",
    },
    {
      title: "Возвращение из декрета",
      pain: "«Меня забыли клиенты, навыки устарели, чувство вины.»",
      note: "База «остыла», энергии на маркетинг с нуля нет.",
    },
  ];

  return (
    <section id="audience" className="bg-surface hairline-top hairline-bottom">
      <div className="container-editorial py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <RevealBlock className="md:col-span-5">
            <p className="eyebrow">Если вы узнали себя</p>
            <h2 className="mt-5 text-4xl md:text-5xl">Шесть типичных сценариев. У каждого — свой алгоритм.</h2>
            <p className="mt-6 text-ink-soft leading-relaxed max-w-md">
              Никакой универсальной методички. Первое, что мы делаем на разборе — определяем,
              с какой точки вы стартуете. От этого зависит всё.
            </p>
          </RevealBlock>
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-hairline hairline-top hairline-bottom">
            {cards.map((c, i) => (
              <RevealBlock
                key={i}
                as="article"
                className="bg-surface p-6 md:p-7"
                delay={i * 60}
              >
                <h3 className="text-[1.05rem] leading-snug font-medium tracking-tight">{c.title}</h3>
                <p className="mt-3 text-[0.9rem] text-ink-soft italic">{c.pain}</p>
                <p className="mt-3 text-[0.82rem] text-muted-foreground">{c.note}</p>
              </RevealBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── ABOUT ─────────────────────────── */

function About() {
  return (
    <section id="about" className="container-editorial py-24 md:py-36">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <RevealBlock className="lg:col-span-7">
          <p className="eyebrow">Кто я</p>
          <h2 className="mt-5 text-4xl md:text-6xl">
            Инженер, который научился <span className="italic text-accent">чинить бизнес</span> так же, как чинил металл.
          </h2>
          <div className="mt-8 space-y-5 text-ink-soft text-[1.02rem] leading-relaxed max-w-xl">
            <p>
              Меня зовут Валерий Панков. 10 лет я работал инженером-дефектоскопистом — искал
              скрытые трещины в металле, которые не видит глаз, но которые разрушают конструкцию
              изнутри.
            </p>
            <p>
              5 лет назад я купил салон красоты в кризисе: долги, текучка мастеров, пустые окна.
              Применил тот же подход — нашёл «трещины» в процессах, устранил их, выстроил систему.
              Через 18 месяцев салон вышел на 1 000 000 ₽ прибыли в месяц.
            </p>
            <p className="text-foreground">
              Сейчас я помогаю косметологам делать то же самое в их кабинетах. Не даю
              мотивационных речей. Даю чертёж, по которому вы строите бизнес как механизм.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 hairline-top pt-8">
            {[
              { k: "10 лет", v: "Инженерного опыта" },
              { k: "5 лет", v: "Владения салоном" },
              { k: "0 → 1 млн", v: "Вывод из кризиса" },
              { k: "50+", v: "Учениц с результатом" },
            ].map((s, i) => (
              <div key={i}>
                <p className="numeric text-2xl md:text-[1.7rem] tracking-tight">{s.k}</p>
                <p className="mt-1.5 text-[0.82rem] text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock className="lg:col-span-5" delay={120}>
          <blockquote className="relative bg-surface rounded-2xl p-8 md:p-10 border border-hairline">
            <p className="text-[1.25rem] md:text-[1.35rem] leading-snug font-display italic">
              «Мотивация выветривается за неделю. Система — работает годами.
              Моя задача — не вдохновить вас, а построить механизм,
              который приносит деньги, даже когда вы устали.»
            </p>
            <footer className="mt-6 flex items-center gap-3">
              <span className="h-px w-8 bg-hairline" />
              <span className="text-[0.82rem] uppercase tracking-[0.16em] text-muted-foreground">
                В.&nbsp;Панков
              </span>
            </footer>
          </blockquote>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ─────────────────────────── CASES ─────────────────────────── */

function Cases() {
  const cases = [
    {
      label: "Типовой сценарий",
      title: "Соло-косметолог, крупный город",
      before: "70 000 ₽",
      after: "180 000 ₽",
      period: "4 месяца",
      body:
        "База 240 контактов лежала в блокноте. Внедрили CRM, скрипт возврата «спящих» клиентов и курсовые продажи. Доход стабилизировался, свободных дней стало три в неделю.",
      levers: ["CRM с нуля", "Возврат базы", "Курсовые продажи"],
    },
    {
      label: "Типовой сценарий",
      title: "Опытный косметолог, миллионник",
      before: "90 000 ₽",
      after: "160 000 ₽",
      period: "3 месяца",
      body:
        "Страх поднимать цены. Проработали позиционирование, ввели два уровня прайса и сценарий консультации на 20 минут. Запись выросла до 3 недель вперёд без роста рекламного бюджета.",
      levers: ["Позиционирование", "Скрипт консультации", "Пересборка прайса"],
    },
    {
      label: "Типовой сценарий",
      title: "Возвращение из декрета",
      before: "40 000 ₽",
      after: "220 000 ₽",
      period: "3 месяца",
      body:
        "«Остывшая» база 180 человек, кабинет на дому, 3 рабочих дня в неделю. Через реанимацию базы и продуманную сегментацию получили запись, которая закрывает график полностью.",
      levers: ["Реанимация базы", "Сегментация", "Автонапоминания"],
    },
  ];

  return (
    <section id="cases" className="bg-surface hairline-top hairline-bottom">
      <div className="container-editorial py-24 md:py-32">
        <RevealBlock className="max-w-3xl">
          <p className="eyebrow">Кейсы</p>
          <h2 className="mt-5 text-4xl md:text-6xl">
            Цифры, которые <span className="italic text-accent">повторимы</span>.
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed max-w-2xl text-[1rem]">
            Ниже — обобщённые сценарии по нескольким ученицам. Имена и точные детали скрыты
            из уважения к их конфиденциальности. Цифры и рычаги — реальные.
          </p>
        </RevealBlock>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <RevealBlock
              key={i}
              as="article"
              className="bg-background border border-hairline rounded-2xl p-7 md:p-8 flex flex-col"
              delay={i * 100}
            >
              <p className="eyebrow">{c.label}</p>
              <h3 className="mt-4 text-2xl md:text-[1.55rem] leading-snug">{c.title}</h3>

              <div className="mt-6 flex items-end gap-4 hairline-top hairline-bottom py-5">
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">Было</p>
                  <p className="numeric mt-1 text-lg text-muted-foreground line-through decoration-1">{c.before}</p>
                </div>
                <div className="flex-1">
                  <p className="text-[0.72rem] uppercase tracking-[0.14em] text-accent">Стало</p>
                  <p className="numeric mt-1 text-2xl md:text-[1.7rem] tracking-tight">{c.after}</p>
                </div>
                <div className="text-right">
                  <p className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">Срок</p>
                  <p className="numeric mt-1 text-lg">{c.period}</p>
                </div>
              </div>

              <p className="mt-5 text-[0.92rem] leading-relaxed text-ink-soft flex-1">{c.body}</p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {c.levers.map((l) => (
                  <li
                    key={l}
                    className="text-[0.72rem] tracking-[0.02em] px-2.5 py-1 rounded-full bg-surface border border-hairline text-ink-soft"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── TESTIMONIALS ─────────────────────────── */

function Testimonials() {
  const quotes = [
    {
      body:
        "Валерий не даёт пустых мотивационных речей. Он приходит с конкретным планом, показывает цифры и объясняет, где утекает прибыль. За 4 месяца доход вырос в 2.5 раза.",
      role: "Соло-косметолог · крупный город",
    },
    {
      body:
        "Я боялась называть цену и предлагать курс процедур. Появились скрипты, которые снимают возражение «дорого». Теперь клиенты сами просят дополнительные услуги.",
      role: "Косметолог · 5 лет практики",
    },
    {
      body:
        "После декрета база «остыла», я не знала, с чего начать. За две недели по плану вернула больше половины старых клиентов. Работаю 3 дня в неделю и зарабатываю больше, чем раньше.",
      role: "Возвращение из декрета",
    },
  ];

  return (
    <section className="container-editorial py-24 md:py-32">
      <RevealBlock className="max-w-3xl">
        <p className="eyebrow">Что говорят ученицы</p>
        <h2 className="mt-5 text-4xl md:text-5xl">Короткие, честные, без штампов.</h2>
      </RevealBlock>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {quotes.map((q, i) => (
          <RevealBlock
            key={i}
            as="figure"
            className="rounded-2xl border border-hairline p-7 md:p-8 flex flex-col"
            delay={i * 100}
          >
            <span aria-hidden className="font-display text-6xl leading-none text-accent select-none">
              &ldquo;
            </span>
            <blockquote className="mt-2 text-[1rem] md:text-[1.02rem] leading-relaxed text-ink-soft">
              {q.body}
            </blockquote>
            <figcaption className="mt-6 pt-5 hairline-top text-[0.78rem] uppercase tracking-[0.16em] text-muted-foreground">
              {q.role}
            </figcaption>
          </RevealBlock>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── PROGRAM (недельный чертёж) ─────────────────────────── */

function Program() {
  const weeks = [
    { w: "Нед. 1", t: "Диагностика системы", d: "Разбираем финансовую модель, воронку, точки утечки денег. Формулируем цель на 2 месяца в цифрах." },
    { w: "Нед. 2", t: "Реанимация базы", d: "Сегментация контактов, скрипт возврата, первая волна касаний. Первые деньги без вложений в рекламу." },
    { w: "Нед. 3", t: "Скрипт консультации", d: "Внедряем 20-минутную структуру приёма, которая закрывает клиента на курс, а не на процедуру." },
    { w: "Нед. 4", t: "CRM и напоминания", d: "Переносим базу в цифру. Автоматизируем повторные визиты. Убираем неявки на 60–80%." },
    { w: "Нед. 5–6", t: "Пересборка прайса", d: "Два уровня прайса, курсовые продукты, обоснование ценности. Средний чек растёт без потери клиентов." },
    { w: "Нед. 7", t: "Каналы притока", d: "Настраиваем 1–2 канала стабильного входящего потока, которые окупаются с первого визита." },
    { w: "Нед. 8", t: "Финансовая гигиена", d: "Учёт по-инженерному: план–факт по неделе, метрики удержания, декомпозиция дохода." },
    { w: "После", t: "Автономная работа", d: "Вы работаете по чертежу без меня. Я остаюсь на связи для консультаций по запросу." },
  ];

  return (
    <section id="program" className="bg-surface hairline-top hairline-bottom">
      <div className="container-editorial py-24 md:py-32">
        <RevealBlock className="max-w-3xl">
          <p className="eyebrow">Что входит</p>
          <h2 className="mt-5 text-4xl md:text-6xl">Восемь недель. По часам, а&nbsp;не по&nbsp;настроению.</h2>
          <p className="mt-6 text-ink-soft leading-relaxed max-w-2xl">
            На разборе мы адаптируем этот чертёж под вашу ситуацию. Порядок может измениться —
            логика зависимости этапов остаётся.
          </p>
        </RevealBlock>

        <ol className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline hairline-top hairline-bottom">
          {weeks.map((w, i) => (
            <RevealBlock
              key={i}
              as="li"
              className="bg-surface p-7 md:p-8 flex gap-6"
              delay={(i % 4) * 80}
            >
              <span className="numeric text-[0.75rem] tracking-[0.18em] uppercase text-muted-foreground pt-1 min-w-[68px]">
                {w.w}
              </span>
              <div>
                <h3 className="text-[1.15rem] md:text-[1.2rem] font-medium tracking-tight">{w.t}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">{w.d}</p>
              </div>
            </RevealBlock>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────── PROCESS ─────────────────────────── */

function Process() {
  const steps = [
    { n: "1", t: "Диагностика", d: "20-минутный звонок. Нахожу 3 точки роста в вашем кабинете. Без обязательств." },
    { n: "2", t: "План", d: "Персональный чертёж на 8 недель. Конкретные цифры, сроки, ответственные шаги." },
    { n: "3", t: "Работа", d: "Внедряем вместе. Я контролирую каждый этап, даю обратную связь, корректирую." },
    { n: "4", t: "Результат", d: "Выход на 150 000+ ₽ и стабильную запись. Система работает без вашего постоянного участия." },
  ];
  return (
    <section className="container-editorial py-24 md:py-32">
      <RevealBlock className="max-w-3xl">
        <p className="eyebrow">Как проходит работа</p>
        <h2 className="mt-5 text-4xl md:text-5xl">Четыре шага. Без сюрпризов.</h2>
      </RevealBlock>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
        {steps.map((s, i) => (
          <RevealBlock key={i} delay={i * 90}>
            <div className="flex items-center gap-3">
              <span className="numeric text-[0.75rem] tracking-[0.2em] text-muted-foreground">{s.n} / 4</span>
              <span className="h-px flex-1 bg-hairline" />
            </div>
            <h3 className="mt-5 text-2xl">{s.t}</h3>
            <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-soft">{s.d}</p>
          </RevealBlock>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── NUMBERS ─────────────────────────── */

function Numbers() {
  const nums = [
    { k: "2.5×", v: "Средний рост дохода за 2 месяца" },
    { k: "89%", v: "Возвращаемость клиентов у учениц" },
    { k: "+3 ч", v: "Свободного времени в день" },
    { k: "94%", v: "Учениц доходят до целевой метрики" },
  ];
  return (
    <section className="bg-foreground text-background">
      <div className="container-editorial py-20 md:py-28">
        <RevealBlock className="max-w-3xl">
          <p className="eyebrow" style={{ color: "rgba(245, 240, 230, 0.6)" }}>Результаты</p>
          <h2 className="mt-5 text-4xl md:text-6xl text-background">
            Метрики, которые <span className="italic" style={{ color: "#FF6B35" }}>говорят сами за себя</span>.
          </h2>
        </RevealBlock>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
          {nums.map((n, i) => (
            <RevealBlock key={i} delay={i * 80}>
              <p className="numeric text-4xl md:text-6xl tracking-tight">{n.k}</p>
              <p className="mt-3 text-[0.88rem]" style={{ color: "rgba(245, 240, 230, 0.65)" }}>
                {n.v}
              </p>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── GUARANTEE ─────────────────────────── */

function Guarantee() {
  return (
    <section className="container-editorial py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <RevealBlock className="md:col-span-5">
          <p className="eyebrow">Гарантия</p>
          <h2 className="mt-5 text-4xl md:text-5xl">Риск беру на себя.</h2>
        </RevealBlock>
        <RevealBlock className="md:col-span-7" delay={100}>
          <p className="text-ink-soft text-[1.05rem] md:text-[1.12rem] leading-relaxed">
            Если за 2 месяца системной работы вы не выходите на ориентир{" "}
            <span className="text-foreground font-medium">150 000 ₽</span>, я продолжаю
            сопровождение бесплатно до достижения цели. Единственное условие — вы выполняете
            шаги плана. Я уверен в методологии, потому что она проверена сначала на моём собственном
            салоне, а потом на десятках учениц.
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ─────────────────────────── FAQ ─────────────────────────── */

function Faq() {
  const items = [
    {
      q: "Сколько стоит наставничество?",
      a: "Стоимость обсуждается индивидуально на бесплатной 20-минутной диагностике — после того, как я разберусь с вашей ситуацией и пойму, какой формат подходит именно вам.",
    },
    {
      q: "У меня очень мало клиентов. Это подходит?",
      a: "Да. Первый этап — реанимация базы. Даже 30–50 контактов могут дать быструю выручку без вложений в рекламу. Начинаем не с трафика, а с того, что уже есть.",
    },
    {
      q: "Я боюсь поднимать цены — клиенты уйдут.",
      a: "Работаем со скриптами обоснования ценности. Цена — производная от системы, а не от смелости. Когда клиент видит структуру услуги, вопрос стоимости уходит на второй план.",
    },
    {
      q: "У вас медицинское образование?",
      a: "Нет, я не косметолог. Я инженер, который построил и вывел на систему косметологический салон. Моя зона — бизнес-процессы, финансы, продажи, автоматизация. Медицинскую часть вы знаете сами.",
    },
    {
      q: "Что если результата не будет?",
      a: "Если за 2 месяца работы вы не выходите на ориентир 150 000 ₽, я продолжаю сопровождение бесплатно до цели. Условие — вы выполняете шаги плана.",
    },
    {
      q: "Сколько времени в неделю это займёт?",
      a: "От 3 до 5 часов в неделю на первом этапе. Дальше меньше: система должна работать без вашего постоянного участия.",
    },
  ];

  return (
    <section id="faq" className="bg-surface hairline-top hairline-bottom">
      <div className="container-editorial py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <RevealBlock className="md:col-span-4">
            <p className="eyebrow">Вопросы</p>
            <h2 className="mt-5 text-4xl md:text-5xl">Отвечаю коротко и по делу.</h2>
            <p className="mt-6 text-ink-soft max-w-sm">
              Не нашли свой вопрос — задайте его на бесплатном разборе.
            </p>
          </RevealBlock>
          <div className="md:col-span-8">
            <div className="hairline-top">
              {items.map((it, i) => (
                <FaqRow key={i} q={it.q} a={it.a} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="group hairline-bottom py-5"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex items-center justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <h3 className="text-[1.1rem] md:text-[1.2rem] font-medium tracking-tight text-foreground">
          {q}
        </h3>
        <span
          aria-hidden
          className={`shrink-0 h-8 w-8 rounded-full border border-hairline flex items-center justify-center transition-transform duration-300 ${
            open ? "rotate-45 bg-foreground text-background border-foreground" : ""
          }`}
        >
          +
        </span>
      </summary>
      <div
        className={`grid transition-[grid-template-rows] duration-400 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-soft max-w-2xl">{a}</p>
        </div>
      </div>
    </details>
  );
}

/* ─────────────────────────── CTA FORM ─────────────────────────── */

function CtaForm() {
  const [state, setState] = useState<"idle" | "submitting" | "done">("idle");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const canSubmit = useMemo(
    () => name.trim().length > 1 && contact.trim().length > 2 && state === "idle",
    [name, contact, state],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setState("submitting");
    // Analytics slot — data-events picked up by GTM / GA4 / Метрика после подключения.
    if (typeof window !== "undefined") {
      const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
      w.dataLayer = w.dataLayer ?? [];
      w.dataLayer.push({ event: "lead_submit", form: "diagnostics", contact_type: "any" });
    }
    // No backend wired — Telegram-first CTA. Simulate short delay then success.
    setTimeout(() => setState("done"), 700);
  };

  return (
    <section id="cta" className="container-editorial py-24 md:py-36 scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <RevealBlock className="lg:col-span-6">
          <p className="eyebrow">Бесплатный разбор</p>
          <h2 className="mt-5 text-4xl md:text-6xl">
            20 минут, чтобы увидеть, где <span className="italic text-accent">утекают деньги</span>.
          </h2>
          <p className="mt-6 text-ink-soft text-[1.05rem] leading-relaxed max-w-lg">
            Проводится лично. Без давления, без продажи в лоб. Даже если вы не пойдёте в наставничество,
            уйдёте с тремя конкретными действиями для вашего кабинета.
          </p>

          <ul className="mt-10 space-y-4 max-w-md">
            {[
              "Разбор ваших финансовых показателей",
              "Главная точка утечки денег в вашем кабинете",
              "3 конкретных шага к росту дохода на ближайший месяц",
              "Рекомендации по CRM под вашу ситуацию",
            ].map((it, i) => (
              <li key={i} className="flex gap-3 text-[0.96rem] text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden />
                <span>{it}</span>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-[0.85rem] text-muted-foreground numeric">
            Средняя продолжительность · 20–25 минут
          </p>
        </RevealBlock>

        <RevealBlock className="lg:col-span-6" delay={120}>
          <div className="bg-background border border-hairline rounded-3xl p-7 md:p-10 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.15)]">
            {state === "done" ? (
              <div className="py-10 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl">
                  ✓
                </div>
                <h3 className="mt-6 text-2xl md:text-3xl">Заявка принята</h3>
                <p className="mt-4 text-ink-soft max-w-sm mx-auto">
                  Свяжусь с вами лично в течение 2 часов. Если вам удобнее — напишите сразу в&nbsp;Telegram.
                </p>
                <a
                  href="https://t.me/Valeriy_Pankov"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost mt-8 inline-flex"
                  data-event="click_telegram"
                >
                  Написать в Telegram
                </a>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h3 className="text-2xl md:text-3xl font-display tracking-tight">
                  Записаться на разбор
                </h3>
                <p className="mt-2 text-[0.9rem] text-muted-foreground">
                  Два поля. Всё остальное — на созвоне.
                </p>

                <div className="mt-8 space-y-5">
                  <Field
                    id="name"
                    label="Как к вам обращаться"
                    value={name}
                    onChange={setName}
                    placeholder="Имя"
                    autoComplete="given-name"
                  />
                  <Field
                    id="contact"
                    label="Telegram или телефон"
                    value={contact}
                    onChange={setContact}
                    placeholder="@username или +7…"
                    autoComplete="tel"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="btn-cta mt-8 w-full disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                  data-event="submit_lead"
                >
                  {state === "submitting" ? "Отправляем…" : "Записаться на разбор"}
                  <span aria-hidden>→</span>
                </button>

                <p className="mt-4 text-[0.78rem] text-muted-foreground leading-relaxed">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных согласно ФЗ-152.
                </p>

                <div className="mt-8 hairline-top pt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.85rem]">
                  <span className="text-muted-foreground">Или напрямую:</span>
                  <a
                    href="https://t.me/Valeriy_Pankov"
                    className="text-foreground hover:text-accent transition-colors"
                    data-event="click_telegram"
                  >
                    Telegram
                  </a>
                  <a
                    href="tel:+79174178388"
                    className="text-foreground hover:text-accent transition-colors"
                    data-event="click_phone"
                  >
                    +7 917 417-83-88
                  </a>
                </div>
              </form>
            )}
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.78rem] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 w-full bg-transparent border-b border-hairline focus:border-foreground outline-none py-3 text-[1.05rem] placeholder:text-muted-foreground transition-colors"
      />
    </div>
  );
}

/* ─────────────────────────── FOOTER ─────────────────────────── */

function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-editorial py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="text-[0.82rem] tracking-[0.22em] uppercase" style={{ color: "rgba(245,240,230,0.6)" }}>
              Панков System
            </p>
            <p className="mt-6 font-display text-3xl md:text-4xl leading-tight max-w-md">
              Система роста для косметологов. Переводим кабинет из хаоса в бизнес,
              который работает без вас.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[0.72rem] uppercase tracking-[0.18em]" style={{ color: "rgba(245,240,230,0.5)" }}>
              Навигация
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              <li><a href="#method" className="hover:opacity-70 transition-opacity">Метод</a></li>
              <li><a href="#about" className="hover:opacity-70 transition-opacity">Кто я</a></li>
              <li><a href="#cases" className="hover:opacity-70 transition-opacity">Кейсы</a></li>
              <li><a href="#program" className="hover:opacity-70 transition-opacity">Программа</a></li>
              <li><a href="#faq" className="hover:opacity-70 transition-opacity">Вопросы</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-[0.72rem] uppercase tracking-[0.18em]" style={{ color: "rgba(245,240,230,0.5)" }}>
              Контакты
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              <li>
                <a href="tel:+79174178388" className="hover:opacity-70 transition-opacity" data-event="click_phone">
                  +7 917 417-83-88
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/Valeriy_Pankov"
                  className="hover:opacity-70 transition-opacity"
                  target="_blank"
                  rel="noreferrer"
                  data-event="click_telegram"
                >
                  Telegram · @Valeriy_Pankov
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@pankov-system.ru"
                  className="hover:opacity-70 transition-opacity"
                  data-event="click_email"
                >
                  info@pankov-system.ru
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 text-[0.78rem]" style={{ color: "rgba(245,240,230,0.55)" }}>
          <div className="space-y-1">
            <p>ИП Панков Валерий Александрович</p>
            <p className="numeric">ИНН · 021602349241 &nbsp;·&nbsp; ОГРНИП · 320028000025284</p>
          </div>
          <div className="md:text-right space-y-1">
            <p>© {new Date().getFullYear()} ПАНКОВ SYSTEM. Все права защищены.</p>
            <p>Информация на сайте не является публичной офертой.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── MOBILE STICKY CTA ─────────────────────────── */

function MobileStickyCta() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 pointer-events-none transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <a
        href="#cta"
        className={`btn-cta w-full pointer-events-auto shadow-[0_20px_50px_-20px_rgba(255,107,53,0.7)] ${
          visible ? "" : "pointer-events-none"
        }`}
      >
        Бесплатный разбор
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}

/* ─────────────────────────── REVEAL HELPER ─────────────────────────── */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
};

function RevealBlock({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const Tag = as as unknown as React.ElementType;
  return (
    <Tag
      ref={ref as unknown as React.Ref<HTMLDivElement>}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
