export interface SetupItem {
  category: string;
  image: {
    light: string | string[];
    dark: string | string[];
  };
  value: string | string[];
  description: string;
  download: string | string[];
  subValue?: string;
  subDownload?: string;
}

const s = (
  category: string,
  image: string | string[],
  value: string | string[],
  description: string,
  download: string | string[],
  options?: {
    subValue?: string;
    subDownload?: string;
    themed?: boolean | boolean[];
  },
): SetupItem => {
  const themed = options?.themed ?? false;
  return {
    category,
    value,
    description,
    download,
    subValue: options?.subValue,
    subDownload: options?.subDownload,
    image: Array.isArray(image)
      ? {
          light: image.map((img, i) =>
            (Array.isArray(themed) ? themed[i] : themed)
              ? `/setup/${img}_light.svg`
              : `/setup/${img}.svg`,
          ),
          dark: image.map((img, i) =>
            (Array.isArray(themed) ? themed[i] : themed)
              ? `/setup/${img}_dark.svg`
              : `/setup/${img}.svg`,
          ),
        }
      : {
          light: themed ? `/setup/${image}_light.svg` : `/setup/${image}.svg`,
          dark: themed ? `/setup/${image}_dark.svg` : `/setup/${image}.svg`,
        },
  };
};

export const SETUP_ITEMS: SetupItem[] = [
  s(
    "Operating System",
    "linux",
    "Arch Linux",
    "Primary development environment with Unix-based workflow.",
    "https://archlinux.org/download/",
    {
      subValue: "Download my Compository",
      subDownload:
        "https://github.com/KenshienAlao/BareSway/archive/refs/heads/main.zip",
    },
  ),
  s(
    "Code Editor",
    ["vscodium", "rider"],
    ["VS Codium", "JetBrains Rider"],
    "Configured with custom themes, extensions, and keyboard shortcuts.",
    ["https://vscodium.com/", "https://www.jetbrains.com/rider/download/"],
  ),
  s(
    "Package Manager",
    ["npm", "pnpm", "yarn"],
    ["npm", "pnpm", "yarn"],
    "Fast, disk-efficient package management.",
    ["https://www.npmjs.com/", "https://pnpm.io/", "https://yarnpkg.com/"],
    { themed: [false, true, false] },
  ),
  s(
    "Version Control",
    ["git", "github"],
    ["Git", "GitHub"],
    "Standard workflow with feature branches and conventional commits.",
    ["https://git-scm.com/", "https://github.com/"],
    { themed: [false, true] },
  ),
];
