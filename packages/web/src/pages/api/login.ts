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

import {NextApiRequest, NextApiResponse} from 'next';
import {setAuthCookies} from 'next-firebase-auth';

import initAuth from '../../auth/initAuth';

initAuth();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await setAuthCookies(req, res);
  } catch (error) {
    console.error('error logging in', error);

    return res.status(500).json({error: 'Could not log in with firebase'});
  }

  return res.status(200).json({status: true});
}

export default handler;
