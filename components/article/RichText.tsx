import React from "react";

type RichNode = {
  type: string;
  tag?: number;
  children?: RichNode[];
  text?: string;
  format?: number;
};

type Props = {
  content: { root?: { children?: RichNode[] } } | null | undefined;
};

function renderNode(node: RichNode, index: number): React.ReactNode {
  switch (node.type) {
    case "paragraph":
      return (
        <p key={index} className="mb-6 text-lg leading-8 text-zinc-700">
          {node.children?.map((child: RichNode, i: number) => renderNode(child, i))}
        </p>
      );

    case "heading":
      {
        const rawTag = String(node.tag || "h2").toLowerCase();
        const Tag = (rawTag.startsWith("h") ? rawTag : `h${rawTag}`) as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

        return (
          <Tag key={index} className="mb-6 mt-10 text-3xl md:text-4xl font-serif font-black text-zinc-950">
            {node.children?.map((child: RichNode, i: number) => renderNode(child, i))}
          </Tag>
        );
      }


    case "text": {
      let element: React.ReactNode = node.text ?? null;

      if (node.format && (node.format & 1)) {
        element = <strong>{element}</strong>;
      }

      if (node.format && (node.format & 2)) {
        element = <em>{element}</em>;
      }

      if (node.format && (node.format & 8)) {
        element = <u>{element}</u>;
      }

      return (
        <span key={index}>{element}</span>
      );
    }

    case "linebreak":
      return <br key={index} />;

    default:
      return null;
  }
}

export default function RichText({ content }: Props) {
  if (!content?.root?.children) {
    return null;
  }

  return (
    <article className="prose prose-zinc max-w-none mb-20">

      {content.root.children.map((node: any, index: number) =>
        renderNode(node, index)
      )}

    </article>
  );
}