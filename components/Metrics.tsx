import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  ImgUrl: string;
  alt: string;
  value: string;
  title: string;
  href?: string;
  textSyles: string;
  isAuthor?: boolean;
  imgStyles?: string;
}
const Metrics = ({
  ImgUrl,
  alt,
  value,
  title,
  href,
  textSyles,
  imgStyles,
  isAuthor,
}: Props) => {
  const metricData = (
    <>
      <Image
        src={ImgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`rounded-full object-contained ${imgStyles}`}
      />
      <p className={` flex item-center gap-1 ${textSyles}`}>{value} {}</p>
      <span
        className={`small-regular line-clamp-1 text-black dark:text-white ${
          isAuthor ? "max-sm:hidden" : ""
        }`}
      >
        {title}
      </span>
    </>
  );
  return href ? (
    <Link href={href} className="flex items-center gap-1 mt-1">
      {metricData}
    </Link>
  ) : (
    <div className="flex items-center gap-1 mt-1">{metricData}</div>
  );
};

export default Metrics;
