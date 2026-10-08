import { StructuredData } from "@/components/StructuredData";
import type { Locale } from "@/i18n/routing";
import { localizedUrl } from "@/i18n/urls";
import { pageUpdated } from "@/lib/pageDates";
import {
  getBreadcrumbSchema,
  getFAQPageSchema,
  getPersonSchema,
  getWebPageSchema,
  SITE_URL,
  TEAM_PEOPLE,
  type WebPageSchemaOptions,
} from "@/lib/seo";

/**
 * The structured data every marketing page should carry: a WebPage (or a more
 * specific type) with its modification date, and a breadcrumb. Pages with a
 * visible FAQ pass it as `faq`; the About page passes `people`.
 *
 * `path` is the internal (Portuguese) pathname key, as everywhere else.
 */
export function PageSchemas({
  id,
  path,
  locale,
  title,
  description,
  type,
  faq,
  people,
}: {
  id: string;
  path: string;
  locale: Locale;
  title: string;
  description: string;
  type?: WebPageSchemaOptions["type"];
  faq?: { question: string; answer: string }[];
  people?: boolean;
}) {
  const url = localizedUrl(SITE_URL, path, locale);
  const breadcrumb = [
    { name: "Scooli", url: localizedUrl(SITE_URL, "/", locale) },
    { name: title, url },
  ];

  return (
    <>
      <StructuredData id={`${id}-breadcrumb`} data={getBreadcrumbSchema(breadcrumb)} />
      <StructuredData
        id={`${id}-webpage`}
        data={getWebPageSchema({
          type,
          title,
          description,
          url,
          breadcrumb,
          locale,
          dateModified: pageUpdated(path),
        })}
      />
      {faq && faq.length > 0 && <StructuredData id={`${id}-faq`} data={getFAQPageSchema(faq)} />}
      {people && (
        <StructuredData
          id={`${id}-people`}
          data={{
            "@context": "https://schema.org",
            "@graph": TEAM_PEOPLE.map((person) => getPersonSchema(person, locale)),
          }}
        />
      )}
    </>
  );
}
