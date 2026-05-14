import { Flex, Meta, Schema } from "@once-ui-system/core";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import { baseURL, gallery, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    canonical: `${baseURL}${gallery.path}`,
    keywords: "portfolio gallery, project screenshots, UI design, dashboard, interface design, fullstack projects",
    openGraph: {
      title: gallery.title,
      description: gallery.description,
      url: `${baseURL}${gallery.path}`,
      type: "website",
      images: gallery.images.map((img: any) => ({
        url: `${baseURL}${img.src}`,
        width: img.width || 1200,
        height: img.height || 630,
        alt: img.alt,
      })),
    },
  });
}

export default function Gallery() {
  return (
    <Flex maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <MasonryGrid />
    </Flex>
  );
}
