import type React from 'react';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
const profileFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
    birthDate: z.date({
        required_error: 'Birth date is required',
    }),
    avatar: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
    name: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '',
    avatar: '/placeholder.svg?height=100&width=100',
};

export default function ProfileForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [avatarPreview, setAvatarPreview] = useState(defaultValues.avatar);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
    });

    async function onSubmit(data: ProfileFormValues) {
        setIsSubmitting(true);
        setFormStatus('idle');

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            console.log('Form submitted:', data);
            setFormStatus('success');
            toast({
                title: 'Profile updated',
                description: 'Your profile has been successfully updated.',
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormStatus('error');
            toast({
                title: 'Error',
                description: 'There was a problem updating your profile.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    // Handle avatar upload
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, you would upload the file to a server
            // For this example, we'll just create a local URL
            const url = URL.createObjectURL(file);
            setAvatarPreview(url);
            form.setValue('avatar', url);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                    Update your personal information and profile settings
                </CardDescription>
            </CardHeader>
            <CardContent>
                {formStatus === 'success' && (
                    <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>
                            Your profile has been updated successfully.
                        </AlertDescription>
                    </Alert>
                )}

                {formStatus === 'error' && (
                    <Alert className="mb-6" variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            There was a problem updating your profile. Please try again.
                        </AlertDescription>
                    </Alert>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex flex-col items-center mb-6">
                            <Avatar className="w-24 h-24 mb-4">
                                <AvatarImage
                                    src={avatarPreview || '/placeholder.svg'}
                                    alt="Profile picture"
                                />
                                <AvatarFallback>
                                    {form.getValues('name')?.[0]}
                                    {form.getValues('lastName')?.[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex items-center gap-2">
                                <Label htmlFor="avatar-upload" className="cursor-pointer">
                                    <div className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
                                        <Upload size={16} />
                                        <span>Upload Avatar</span>
                                    </div>
                                    <Input
                                        id="avatar-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAvatarChange}
                                    />
                                </Label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your first name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your last name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Password must be at least 8 characters and include
                                        uppercase, lowercase, and numbers.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Birth Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={'outline'}
                                                    className={`w-full pl-3 text-left font-normal ${!field.value ? 'text-muted-foreground' : ''}`}>
                                                    {field.value ? (
                                                        format(field.value, 'PPP')
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() ||
                                                    date < new Date('1900-01-01')
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating Profile...
                                </>
                            ) : (
                                'Update Profile'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
