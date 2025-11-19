"use client";

import React from "react";
import { NextIntlClientProvider } from "next-intl";

export function LanguageProvider({ children, messages, initialLocale }) {
  return (
    <NextIntlClientProvider locale={initialLocale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
