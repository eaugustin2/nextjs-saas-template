import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from '@/components/ui/accordion'

const FAQs = () => {
  return (
    <section className="my-20">
      <Accordion type="single" collapsible className="mx-20 flex flex-col">
        <AccordionItem value="value-1">
          <AccordionTrigger className="w-full cursor-pointer">
            Frequently Asked Question Here
          </AccordionTrigger>
          <AccordionContent>
            <p>Content for Accordion</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="value-2">
          <AccordionTrigger className="w-full cursor-pointer">
            Frequently Asked Question Here
          </AccordionTrigger>
          <AccordionContent>
            <p>Content for Accordion</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="value-3">
          <AccordionTrigger className="w-full cursor-pointer">
            Frequently Asked Question Here
          </AccordionTrigger>
          <AccordionContent>
            <p>Content for Accordion</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}

export default FAQs
