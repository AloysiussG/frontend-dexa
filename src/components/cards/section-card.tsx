import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionCardProps {
  cardTitle?: string;
  cardDescription?: string;
  cardAction?: React.ReactNode;
  cardFooter?: React.ReactNode;
}

export default function SectionCard({
  cardDescription = "Card Description",
  cardTitle = "Card Title",
  cardAction,
  cardFooter,
}: SectionCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader className="h-full">
        <CardDescription>{cardDescription}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl self-end">
          {cardTitle}
        </CardTitle>
        {cardAction && <CardAction>{cardAction}</CardAction>}
      </CardHeader>
      {cardFooter && (
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {cardFooter}
        </CardFooter>
      )}
    </Card>
  );
}
