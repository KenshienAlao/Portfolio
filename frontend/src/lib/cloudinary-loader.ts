export interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "lpxtww2i";

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (
    src.startsWith("/") ||
    src.startsWith("blob:") ||
    src.startsWith("data:")
  ) {
    return src;
  }

  const params = `f_auto,c_limit,w_${width},q_${quality ?? "auto"}`;

  if (src.includes("res.cloudinary.com")) {
    return src.replace("/image/upload/", `/image/upload/${params}/`);
  }

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${params}/${src}`;
}
