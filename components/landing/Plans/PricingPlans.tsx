import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CircleCheck } from 'lucide-react'

const PricingPlans = () => {
  return (
    <section className="mt-4 flex w-full flex-col items-center justify-center gap-12">
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <h1 className="text-3xl font-bold">Choose your plan</h1>
        <span className="text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis
          tortor eros. Donec vitae tortor lacus. Phasellus aliquam ante in
          maximus.
        </span>
      </div>
      <Tabs defaultValue="monthly" className="w-full items-center gap-4">
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>

        <TabsContent
          value="monthly"
          className="flex w-full items-center justify-center"
        >
          <Card className="h-96 w-1/4">
            <CardHeader className="gap-6">
              <CardTitle>
                <h2 className="text-2xl font-semibold text-gray-700">
                  Standard
                </h2>
                <p className="mt-2 text-gray-500">Description section</p>
              </CardTitle>
              <CardDescription className="">
                <div className="flex flex-row">
                  <h3 className="text-3xl font-bold">39.99</h3>{' '}
                  <span className="text-gray-500">/month</span>
                </div>
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>
              <ul className="flex flex-col gap-4">
                <li className="flex flex-row gap-4">
                  <CircleCheck /> Feature 1
                </li>
                <li className="flex flex-row gap-4">
                  <CircleCheck /> Feature 1
                </li>
                <li className="flex flex-row gap-4">
                  <CircleCheck /> Feature 1
                </li>
                <li className="flex flex-row gap-4">
                  <CircleCheck /> Feature 1
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent
          value="yearly"
          className="flex w-full items-center justify-center"
        >
          <Card className="h-96 w-1/4">
            <CardHeader className="gap-6">
              <CardTitle>
                <h2 className="text-2xl font-semibold text-gray-700">
                  Standard
                </h2>
                <p className="mt-2 text-gray-500">Description section</p>
              </CardTitle>
              <CardDescription>
                <div className="flex flex-row">
                  <h3 className="text-3xl font-bold">39.99</h3>{' '}
                  <span className="text-gray-500">/year</span>
                </div>
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>
              <ul className="flex flex-col gap-4">
                <li className="flex flex-row gap-4">
                  <CircleCheck /> Feature 1
                </li>
                <li className="flex flex-row gap-4">
                  <CircleCheck /> Feature 1
                </li>
                <li className="flex flex-row gap-4">
                  <CircleCheck /> Feature 1
                </li>
                <li className="flex flex-row gap-4">
                  <CircleCheck /> Feature 1
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default PricingPlans
