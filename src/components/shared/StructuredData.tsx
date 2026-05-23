import { allStructuredData } from "@/lib/schemas";

export default function StructuredData() {
  const graphs = allStructuredData();
  return (
    <>
      {graphs.map((graph, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </>
  );
}
