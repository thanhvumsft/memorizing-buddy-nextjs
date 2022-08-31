import { authorize } from "@liveblocks/node";
import { NextApiRequest, NextApiResponse } from "next";


  //TODO: Move this to env files
const API_KEY = process.env.API_KEY_WARNING;

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  if (!API_KEY) {
    return res.status(403).end();
  }

  // For the avatar example, we're generating random users
  // and set their info from the authentication endpoint
  // See https://liveblocks.io/docs/api-reference/liveblocks-node#authorize for more information
  const response = await authorize({
    room: req.body.room,
    secret: API_KEY,
    userInfo: {
      name: NAMES[Math.floor(Math.random() * NAMES.length)].name,
      picture: `/avatars/${Math.floor(Math.random() * 10)}.png`,
    },
  });
  return res.status(response.status).end(response.body);
}

export const NAMES = [
  {	id:	"clement.depres",	name:	"Clément Depres"	},
  {	id:	"kilian.corredor",	name:	"Kilian Corredor"	},
  {	id:	"erwan.maintenant",	name:	"Erwan Maintenant"	},
  {	id:	"leo.queguiner",	name:	"Leo Queguiner"	},
  {	id:	"ronan.le.coupanec",	name:	"Ronan Le Coupanec"	},
  {	id:	"christophe.jallet",	name:	"Christophe Jallet"	},
  {	id:	"talal.el.karkouri",	name:	"Talal El Karkouri"	},
  {	id:	"ali.benarbia",	name:	"Ali Benarbia"	}
];
