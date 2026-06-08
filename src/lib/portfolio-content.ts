import type { ClientReview, PortfolioCase } from "@/data/portfolio";

export function getPortfolioDescription(item: PortfolioCase): string {
  if (item.contentType === "case-study" && item.problem && item.solution) {
    const results =
      item.results && item.results.length > 0
        ? `\n\nHasil: ${item.results.join(" · ")}`
        : "";
    return `${item.problem}\n\nSolusi: ${item.solution}${results}`;
  }

  if (item.features && item.features.length > 0) {
    return item.features.map((f) => `${f.label}: ${f.desc}`).join("\n");
  }

  if (item.descPoints && item.descPoints.length > 0) {
    return item.descPoints.join("\n");
  }

  return item.subtitle ?? "";
}

export function formatReviewAttribution(review: ClientReview): string {
  const parts = [review.author];
  if (review.role) parts.push(review.role);
  if (review.company) parts.push(review.company);
  return parts.join(" · ");
}
