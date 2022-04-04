/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import bg from "./languages/bg.json";
import cs from "./languages/cs.json";
import de from "./languages/de.json";
import el from "./languages/el.json";
import en from "./languages/en.json";
import es from "./languages/es.json";
import fr from "./languages/fr.json";
import hu from "./languages/hu.json";
import it from "./languages/it.json";
import nl from "./languages/nl.json";
import no from "./languages/no.json";
import pl from "./languages/pl.json";
import pt from "./languages/pt.json";
import ru from "./languages/ru.json";
import sk from "./languages/sk.json";
import sl from "./languages/sl.json";
import tr from "./languages/tr.json";
import zh from "./languages/zh.json";

const resources = { bg, cs, de, el, en, es, fr, hu, it, nl, no, pl, pt, ru, sk, sl, tr, zh };

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "en",
    debug: false,
    ns: ["global"],
    defaultNS: "global",
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
