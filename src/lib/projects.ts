import plantwiseImage from "@/assets/plantwise-project.jpg.asset.json";
import campusConnectImage from "@/assets/campusconnect-project.jpg.asset.json";

export type PortfolioProject = {
  number: string;
  title?: string;
  type?: string;
  image?: string;
  imageAlt?: string;
  tags?: string[];
  isPlaceholder?: boolean;
};

export const projects: PortfolioProject[] = [
  {
    number: "01",
    title: "Plantwise",
    type: "Plant stress insight",
    image: plantwiseImage.url,
    imageAlt: "Plantwise plant-care guidance with a plant photo upload and insight panel",
  },
  {
    number: "02",
    title: "CampusConnect",
    type: "Every student mapped to the faculty",
    image: campusConnectImage.url,
    imageAlt: "CampusConnect landing page for students, faculty, and administrators",
  },
  { number: "03", isPlaceholder: true },
  { number: "04", isPlaceholder: true },
  { number: "05", isPlaceholder: true },
  { number: "06", isPlaceholder: true },
];