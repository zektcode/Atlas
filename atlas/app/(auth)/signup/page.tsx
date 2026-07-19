"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const [email, setEmail] = useState("");

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-lg border border-border bg-bg-elevated p-8">
        <h1 className="font-display text-2xl text-text-1 mb-1">Create your account</h1>
        <p className="text-xs text-text-3 mb-6">No card required. See your first Sleep Score in under a minute.</p>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO(integration): call Supabase Auth signUp here.
            console.log("signup attempt", email);
          }}
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-border-strong bg-bg-surface px-3.5 py-2.5 text-sm text-text-1 outline-none focus:border-indigo"
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-md border border-border-strong bg-bg-surface px-3.5 py-2.5 text-sm text-text-1 outline-none focus:border-indigo"
          />
          <Button type="submit" className="w-full">Create account</Button>
        </form>
      </div>
    </main>
  );
}
