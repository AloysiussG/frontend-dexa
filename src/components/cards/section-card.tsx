import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

interface SectionCardProps {
  cardTitle?: string;
  cardDescription?: string;
  cardAction?: React.ReactNode;
  cardFooter?: React.ReactNode;
}

const defaultCardAction = (
  <Badge variant="outline">
    <IconTrendingUp />
    +12.5%
  </Badge>
);

const defaultCardFooter = (
  <>
    <div className="line-clamp-1 flex gap-2 font-medium">
      Trending up this month <IconTrendingUp className="size-4" />
    </div>
    <div className="text-muted-foreground">Visitors for the last 6 months</div>
  </>
);

export default function SectionCard({
  cardDescription = "Card Description",
  cardTitle = "Card Title",
  cardAction,
  cardFooter,
}: SectionCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{cardDescription}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
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
