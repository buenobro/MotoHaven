import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Check } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().optional(),
  bikeInfo: z.string().optional(),
  startDate: z.date({ required_error: "Please select a start date" }),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface StorageBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storageUnit: {
    id: string;
    name: string;
    price: number;
  } | null;
}

export default function StorageBookingDialog({
  open,
  onOpenChange,
  storageUnit,
}: StorageBookingDialogProps) {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      bikeInfo: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      return apiRequest("POST", "/api/storage-bookings", {
        ...data,
        storageUnitId: storageUnit?.id,
        startDate: data.startDate.toISOString(),
      });
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: "Reservation confirmed!",
        description: "We'll be in touch shortly to finalize details.",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingFormData) => {
    mutation.mutate(data);
  };

  const handleClose = () => {
    setIsSuccess(false);
    form.reset();
    onOpenChange(false);
  };

  if (!storageUnit) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="mb-2">Reservation Confirmed!</DialogTitle>
            <DialogDescription className="mb-6">
              Your {storageUnit.name} reservation has been submitted. We'll contact you within 24 hours to finalize details.
            </DialogDescription>
            <Button onClick={handleClose} data-testid="button-close-success">
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Reserve {storageUnit.name}</DialogTitle>
              <DialogDescription>
                ${storageUnit.price}/month - Fill in your details to reserve your storage unit.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} data-testid="input-booking-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} data-testid="input-booking-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="(604) 555-0123" {...field} data-testid="input-booking-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                              data-testid="button-select-date"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : "Select a date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bikeInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bike Details (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Year, make, model (e.g., 2022 BMW R1250GS)"
                          {...field}
                          data-testid="input-booking-bike"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1"
                    data-testid="button-cancel-booking"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={mutation.isPending}
                    data-testid="button-confirm-booking"
                  >
                    {mutation.isPending ? "Reserving..." : "Confirm Reservation"}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
