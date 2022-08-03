/*
 * TikTok clone as web application
 * Copyright (C) 2022  Gabrielle Guimarães de Oliveira
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/* eslint-disable no-unused-vars */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      readonly MONGO_URI: string;
      readonly STORAGE_BUCKET: string;
      readonly GOOGLE_APPLICATION_CREDENTIALS?: string;
      readonly FIREBASE_PROJECT_ID?: string;
      readonly FIREBASE_CLIENT_EMAIL?: string;
      readonly FIREBASE_PRIVATE_KEY?: string;
    }
  }
}
