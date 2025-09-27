"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { format } from "date-fns";

type Props = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
};

export function DatePicker({ date, setDate }: Props) {
  const [open, setOpen] = React.useState(false);
  //   const [date, setDate] = React.useState<Date | undefined>(new Date());

  const shiftDate = (days: number) => {
    const base = date ?? new Date();
    const newDate = new Date(base);
    newDate.setDate(base.getDate() + days);
    setDate(newDate);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-3">
        <div className="flex flex-row gap-1">
          {/* Prev day */}
          <Button variant="outline" size="icon" onClick={() => shiftDate(-1)}>
            <IconChevronLeft />
          </Button>

          {/* Calendar */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-48 justify-between font-normal"
              >
                {date ? format(date, "d MMMM yyyy") : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>

          {/* Next day */}
          <Button variant="outline" size="icon" onClick={() => shiftDate(1)}>
            <IconChevronRight />
          </Button>
        </div>

        {/* Today */}
        <Button
          variant="outline"
          onClick={() => {
            setDate(new Date());
          }}
        >
          Today
        </Button>
      </div>
    </div>
  );
}
