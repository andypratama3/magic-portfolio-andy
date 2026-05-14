/**
 * SchemaScript component for rendering JSON-LD structured data
 * Place this in your Next.js page layout
 */

interface SchemaScriptProps {
  schemas: any | any[];
  priority?: boolean;
}

export function SchemaScript({ schemas, priority = true }: SchemaScriptProps) {
  const schemaList = Array.isArray(schemas) ? schemas : [schemas];
  
  // Filter out undefined/null values
  const validSchemas = schemaList.filter(Boolean);
  
  if (validSchemas.length === 0) {
    return null;
  }

  const schema =
    validSchemas.length === 1
      ? validSchemas[0]
      : {
          "@context": "https://schema.org",
          "@graph": validSchemas,
        };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
      suppressHydrationWarning
    />
  );
}

export default SchemaScript;
