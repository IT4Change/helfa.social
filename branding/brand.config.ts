// helfa.social brand on the runtime branding mechanism (replaces branding/constants/*.js).
//
// Authored in TypeScript against @ocelot-social/branding: `defineBranding` type-checks these
// overrides against the branding schema; a wrong key or type FAILS the build. Only values that
// differ from the framework defaults are set (sparse override) — this brand is deliberately close to
// vanilla, so most of the old constants files map to nothing at all here:
//   • donation (gradient), group name lengths, the logo header width/click, the landing page and the
//     footer order all already MATCH the framework default;
//   • there was no THEME_COLOR, so the brand keeps the framework palette (no theme stylesheet).
//
// Content layout (one served assets folder, dynamically bound at runtime): assets/ = images,
// html/ = static page HTML per locale. Paths are ROOT-relative; the multi-brand build namespaces
// them to /branding/helfa/… (collision-free).
//
// NOT here: e-mails / e-mail links (SUPPORT_EMAIL, ORGANIZATION_LINK, SUPPORT_LINK) are ENV → set in
// helmfile/environments/*.yaml.gotmpl.
import { defineBranding, type LinkPageKey } from '@ocelot-social/branding'

const HTML_FILE: Partial<Record<LinkPageKey, string>> = {
  organization: 'organization',
  donate: 'donate',
  imprint: 'imprint',
  termsAndConditions: 'terms-and-conditions',
  codeOfConduct: 'code-of-conduct',
  dataPrivacy: 'data-privacy',
  faq: 'faq',
  support: 'support',
}
const html = Object.fromEntries(
  Object.entries(HTML_FILE).map(([page, file]) => [
    page,
    { de: `html/de/${file}.html`, en: `html/en/${file}.html` },
  ]),
)

export default defineBranding({
  about: {
    description: 'helfa.social — the H.e.l.f.a. community network, driven by ocelot.social.',
  },
  metadata: {
    applicationName: 'helfa.social',
    applicationShortName: 'helfa.social',
    applicationDescription: 'H.e.l.f.a. Community Network driven by ocelot.social',
    organizationName: 'H.e.l.f.a. Community',
    organizationJurisdiction: 'Deutschland',
  },
  group: {
    descriptionMinLength: 10,
  },
  logos: {
    headerPath: 'assets/logo-horizontal.svg',
    headerMobilePath: 'assets/logo-horizontal.svg',
    signupPath: 'assets/logo-squared.svg',
    welcomePath: 'assets/logo-squared.svg',
    logoutPath: 'assets/logo-squared.svg',
    passwordResetPath: 'assets/logo-squared.svg',
  },
  headerMenu: {
    // Donation button; the icon used to be the framework-served /icon.png and is now a brand asset.
    customButton: {
      iconPath: 'assets/icon.png',
      iconWidth: '28px',
      iconAltText: 'Donate',
      toolTipIdent: 'rebranding.header.donate.tooltip',
      path: '/donate',
    },
  },
  links: {
    // Every static page is INTERNAL here. The framework defaults point four of them at ocelot.social,
    // so they have to be cleared explicitly — `null` means "no external link", which is distinct from
    // omitting the field (that would inherit the default).
    pages: {
      organization: { externalLink: null },
      donate: { externalLink: null },
      imprint: { externalLink: null },
      support: { externalLink: null },
    },
  },
  assets: {
    css: [],
    html,
    favicon: 'assets/favicon.ico',
  },
  locales: {
    de: { rebranding: { header: { donate: { tooltip: 'Spenden' } } } },
    en: { rebranding: { header: { donate: { tooltip: 'Donate' } } } },
  },
})
