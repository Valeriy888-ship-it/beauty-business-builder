import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-5xl text-foreground">Страница не найдена</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Возможно, ссылка устарела или страница была перемещена.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-ghost">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Ошибка загрузки</p>
        <h1 className="mt-4 text-4xl text-foreground">Что-то пошло не так</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Попробуйте обновить страницу или вернуться на главную.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-cta"
          >
            Попробовать снова
          </button>
          <a href="/" className="btn-ghost">На главную</a>
        </div>
      </div>
    </div>
  );
}

const SITE_TITLE = "ПАНКОВ SYSTEM — наставник для косметологов. Система дохода 150 000+ ₽";
const SITE_DESCRIPTION =
  "Инженерный подход к бьюти-бизнесу. Помогаю соло-косметологам и владельцам кабинетов выйти на стабильный доход 150 000+ ₽ за 2 месяца — без найма и слива бюджета на рекламу.";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#F5F0E6" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "author", content: "Валерий Панков" },
      { name: "keywords", content: "наставник косметологов, бизнес для косметологов, система в косметологии, доход косметолога, CRM для косметолога, Валерий Панков, ПАНКОВ SYSTEM" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:site_name", content: "ПАНКОВ SYSTEM" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ru_RU" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "format-detection", content: "telephone=no" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Валерий Панков",
          jobTitle: "Бизнес-наставник для косметологов",
          url: "/",
          telephone: "+7 917 417-83-88",
          sameAs: ["https://t.me/Valeriy_Pankov"],
          description:
            "Инженер-дефектоскопист с 10-летним опытом. Владелец салона красоты, вывел бизнес на 1 000 000 ₽ прибыли в месяц. Помогает косметологам строить системный бизнес.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
