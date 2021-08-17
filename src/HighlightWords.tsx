import React, { ElementType, PureComponent, ReactNode } from 'react';
import highlightWords from 'highlight-words';

interface Props {
  text: string;
  words: string | string[];
  highlightClassName?: string;
  tagName?: ElementType;
}

export class HighlightWords extends PureComponent<Props> {
  render(): ReactNode {
    const { text, words, highlightClassName, tagName = 'span' } = this.props;
    const query = typeof words === 'string' ? words : words.join(' ');

    const chunks = highlightWords({ text, query });

    return (
      <span>
        {chunks.map((chunk) => {
          if (!chunk.match) {
            return <span key={chunk.key}>{chunk.text}</span>;
          }

          const Component = tagName;

          return (
            <Component key={chunk.key} className={highlightClassName}>
              {chunk.text}
            </Component>
          );
        })}
      </span>
    );
  }
}
