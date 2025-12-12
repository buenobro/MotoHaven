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
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const signupSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().optional(),
  bikeInfo: z.string().optional(),
});

type SignupFormData = z.infer<typeof signupSchema>;

interface MembershipSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tier: {
    id: string;
    name: string;
    price: number;
  } | null;
}

export default function MembershipSignupDialog({
  open,
  onOpenChange,
  tier,
}: MembershipSignupDialogProps) {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      bikeInfo: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: SignupFormData) => {
      return apiRequest("POST", "/api/membership-signups", {
        ...data,
        tierId: tier?.id,
      });
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: "Welcome to the club!",
        description: "Your membership signup has been received.",
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

  const onSubmit = (data: SignupFormData) => {
    mutation.mutate(data);
  };

  const handleClose = () => {
    setIsSuccess(false);
    form.reset();
    onOpenChange(false);
  };

  if (!tier) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[450px]">
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="mb-2">Welcome to MotoVault!</DialogTitle>
            <DialogDescription className="mb-6">
              You've signed up for the {tier.name} membership
              {tier.price > 0 ? ` ($${tier.price}/month)` : " (Free)"}.
              We'll be in touch with next steps!
            </DialogDescription>
            <Button onClick={handleClose} data-testid="button-close-membership-success">
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Join as {tier.name}</DialogTitle>
              <DialogDescription>
                {tier.price > 0 ? `$${tier.price}/month` : "Free"} - Enter your details to join the MotoVault community.
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
                        <Input placeholder="John Doe" {...field} data-testid="input-member-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} data-testid="input-member-email" />
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
                        <Input placeholder="(604) 555-0123" {...field} data-testid="input-member-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bikeInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Bike (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your ride..."
                          {...field}
                          data-testid="input-member-bike"
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
                    data-testid="button-cancel-membership"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={mutation.isPending}
                    data-testid="button-confirm-membership"
                  >
                    {mutation.isPending ? "Signing up..." : "Join Now"}
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
