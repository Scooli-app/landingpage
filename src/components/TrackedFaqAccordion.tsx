"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { captureMarketingEvent } from "@/lib/analytics";
import { useRef } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

export function TrackedFaqAccordion({
  items,
  faqGroup,
  itemValuePrefix,
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
}: {
  items: FaqItem[];
  faqGroup: string;
  itemValuePrefix: string;
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}) {
  const lastOpenedValueRef = useRef<string | null>(null);

  return (
    <Accordion
      type="single"
      collapsible
      className={className}
      onValueChange={(value) => {
        if (!value || value === lastOpenedValueRef.current) {
          return;
        }

        lastOpenedValueRef.current = value;
        captureMarketingEvent("marketing_faq_opened", {
          faq_group: faqGroup,
          faq_id: value,
        });
      }}
    >
      {items.map((faq, index) => {
        const value = `${itemValuePrefix}-${index}`;

        return (
          <AccordionItem
            key={faq.question}
            value={value}
            className={itemClassName}
          >
            <AccordionTrigger className={triggerClassName}>
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className={contentClassName}>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
