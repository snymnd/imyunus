type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
  logo?: string;
};
export function openGraph({
  siteName,
  templateTitle,
  description,
  logo = 'https://my-project-og.vercel.app/images/my-logo-dark.png',
}: OpenGraphType): string {
  const ogLogo = encodeURIComponent(logo);
  const ogSiteName = encodeURIComponent(siteName.trim());
  const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined;
  const ogDesc = encodeURIComponent(description.trim());

  return `https://my-project-og.vercel.app/api/general?siteName=${ogSiteName}&description=${ogDesc}&logo=${ogLogo}&logoHeight=150&logoWidth=350&theme=light${
    ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''
  }`;
}
