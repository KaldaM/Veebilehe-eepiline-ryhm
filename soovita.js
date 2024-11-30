/**
 *  See JavaScripti kood põhineb algselt Matteuse Kalda loodud Pythoni koodil.
 * See on konverteeritud JavaScripti, kasutades OpenAI abimeest (ChatGPT).
 * Algkood ja selle ideed on loodud 2024. aastal.
 */


/**
 * Funktsioon isikukoodist info tuvastamiseks.
 * Algne loogiks loodud Pythonis, konverteeritud JavaScripti ChatGPT abiga.
 */
function infoIsikukoodist(isikukoodStr) {
    const isikukoodList = Array.from(isikukoodStr, Number);
    let sugu;
    let aasta;

    // Soo määramine
    if ([1, 3, 5, 7].includes(isikukoodList[0])) {
        sugu = 'mees';
    } else if ([2, 4, 6, 8].includes(isikukoodList[0])) {
        sugu = 'naine';
    }

    // Aasta määramine
    if (isikukoodList[0] < 3) {
        aasta = '18' + isikukoodList[1].toString() + isikukoodList[2].toString();
    } else if (isikukoodList[0] < 5 && isikukoodList[0] > 2) {
        aasta = '19' + isikukoodList[1].toString() + isikukoodList[2].toString();
    } else if (isikukoodList[0] >= 5) {
        aasta = '20' + isikukoodList[1].toString() + isikukoodList[2].toString();
    }

    // Kuupäeva määramine
    const kuuNr = isikukoodList[3].toString() + isikukoodList[4].toString();
    const paevaNr = isikukoodList[5].toString() + isikukoodList[6].toString();
    const dateString = `${aasta}-${kuuNr}-${paevaNr}`;
    const synniKuupaev = new Date(dateString);
    const praeguneKuupaev = new Date();

    // Vanuse arvutamine
    let vanus = praeguneKuupaev.getFullYear() - synniKuupaev.getFullYear();
    if (
        praeguneKuupaev.getMonth() < synniKuupaev.getMonth() ||
        (praeguneKuupaev.getMonth() === synniKuupaev.getMonth() && praeguneKuupaev.getDate() < synniKuupaev.getDate())
    ) {
        vanus--;
    }

    // Haigla määramine
    let haigla = vanus < 18 ? 'Alaealine' : 'Täisealine';
    if (parseInt(aasta) < 2013) {
        const haiglaNr = parseInt(isikukoodList.slice(7, 10).join(''));

        if (haiglaNr >= 1 && haiglaNr <= 10) haigla = 'Kuressaare haigla';
        else if (haiglaNr >= 11 && haiglaNr <= 19) haigla = 'Tartu Ülikooli Naistekliinik';
        else if (haiglaNr >= 21 && haiglaNr <= 150) haigla = 'Ida-Tallinna keskhaigla, Pelgulinna sünnitusmaja (Tallinn)';
        else if (haiglaNr >= 151 && haiglaNr <= 160) haigla = 'Keila haigla';
        else if (haiglaNr >= 161 && haiglaNr <= 220) haigla = 'Rapla haigla, Loksa haigla, Hiiumaa haigla (Kärdla)';
        else if (haiglaNr >= 221 && haiglaNr <= 270) haigla = 'Ida-Viru keskhaigla (Kohtla-Järve, endine Jõhvi)';
        else if (haiglaNr >= 271 && haiglaNr <= 370) haigla = 'Maarjamõisa kliinikum (Tartu), Jõgeva haigla';
        else if (haiglaNr >= 371 && haiglaNr <= 420) haigla = 'Narva haigla';
        else if (haiglaNr >= 421 && haiglaNr <= 470) haigla = 'Pärnu haigla';
        else if (haiglaNr >= 471 && haiglaNr <= 490) haigla = 'Haapsalu haigla';
        else if (haiglaNr >= 491 && haiglaNr <= 520) haigla = 'Järvamaa haigla (Paide)';
        else if (haiglaNr >= 521 && haiglaNr <= 570) haigla = 'Rakvere haigla, Tapa haigla';
        else if (haiglaNr >= 571 && haiglaNr <= 600) haigla = 'Valga haigla';
        else if (haiglaNr >= 601 && haiglaNr <= 650) haigla = 'Viljandi haigla';
        else if (haiglaNr >= 651 && haiglaNr <= 700) haigla = 'Lõuna-Eesti haigla (Võru), Põlva haigla';
        else haigla = 'Sünnitushaigla ei ole teada';
    }

    return { sugu, vanus, haigla };
}

/**
 * Funktsioon isikukoodi õigsuese kontrollimiseks.
 * Arvutuseks vajalikud tehted on kirjutatud isikukoodi Wikipedia lehelt saadud info põhjal
 * Algne loogika loodud Pythonis, konverteeritud JavaScripti ChatGPT abiga.
 */
function onKorrektneIsikukood(isikukoodStr) {

    // Kontrollib, kas isikukood on täpselt 11 numbrit
    if (!/^\d{11}$/.test(isikukoodStr)) {
      return false; // Kui isikukood ei vasta nõuetele (pole täpselt 11 numbrit), on see vigane
    }
    
    const isikukoodList = Array.from(isikukoodStr, Number);
    const kontrollNrKoodil = isikukoodList[10];
    
    // Samm 1
    const samm1 = isikukoodList[0] * 1 + isikukoodList[1] * 2 + isikukoodList[2] * 3 + isikukoodList[3] * 4 +
                  isikukoodList[4] * 5 + isikukoodList[5] * 6 + isikukoodList[6] * 7 + isikukoodList[7] * 8 +
                  isikukoodList[8] * 9 + isikukoodList[9] * 1;
    let samm2 = samm1 % 11;
    let kontrollNr;

    if (samm2 < 10) {
        kontrollNr = samm2;
    } else {
        // Samm 3
        const samm3 = isikukoodList[0] * 3 + isikukoodList[1] * 4 + isikukoodList[2] * 5 + isikukoodList[3] * 6 +
                      isikukoodList[4] * 7 + isikukoodList[5] * 8 + isikukoodList[6] * 9 + isikukoodList[7] * 1 +
                      isikukoodList[8] * 2 + isikukoodList[9] * 3;
        let samm4 = samm3 % 11;

        kontrollNr = samm4 < 10 ? samm4 : 0;
    }

    return kontrollNrKoodil === kontrollNr;
}

/**
 * See funktsioon sisaldab sõnastiku, kus on jagatud kategooriateks mehed ja naised.
 * Nad jagunevad edasi haiglateks
 * Haiglad jagunevad kolme vanusegruppi - noor, keskiga ja vana
 * Algne loogika loodud Pythonis, konverteeritud JavaScripti ChatGPT abiga  */
function soovitatudJoogid(sugu, vanus, haigla) {
  const joogid = {
      mees: {
        "Kuressaare haigla": {
          noor: ["Segumahl", "Saaremaa tuulik", "Hlibny Dar"],
          keskiga: ["Must kohv", "Rock", "Viin Saaremaa"],
          vana: ["Saaremaa vesi", "Vana Tallinn", "Viin Saaremaa"]
        },
        "Tartu Ülikooli Naistekliinik": {
          noor: ["Juissi", "A.Le.Coq Premium", "Laua Viin"],
          keskiga: ["Alkoholivaba Premium", "Alexander", "Absolut Vodka"],
          vana: ["Kraanivesi", "Alexander", "Valge venelane"]
        },
        "Ida-Tallinna keskhaigla, Pelgulinna sünnitusmaja (Tallinn)": {
          noor: ["Banaanismuuti", "Jägermeister", "Absolut Vodka"],
          keskiga: ["Coca-Cola", "Tullamore Dew", "Saku Original"],
          vana: ["Must tee", "Vana Tallinn", "Viru Valge"]
        },
        "Keila haigla": {
          noor: ["Limpa limonaad", "Beloff viin", "Sparta"],
          keskiga: ["Segumahl", "Captain Morgan", "Absolut Vodka"],
          vana: ["Piim", "Absolut vodka", "Laua viin"]
        },
        "Rapla haigla, Loksa haigla, Hiiumaa haigla (Kärdla)": {
          noor: ["Fanta", "Sparta", "Jägermeister"],
          keskiga: ["Tomatimahl", "Tullamore Dew", "Rock"],
          vana: ["Mineraalvesi", "A. Le Coq Premium", "Laua Viin"]
        },
        "Ida-Viru keskhaigla (Kohtla-Järve, endine Jõhvi)": {
          noor: ["Ananassimahl", "Laua Viin", "Viru Valge"],
          keskiga: ["Marjasmuuti", "Alexander", "Viru Valge"],
          vana: ["Piim", "Bock", "Viru Valge"]
        },
        "Maarjamõisa kliinikum (Tartu), Jõgeva haigla": {
          noor: ["Fanta", "Absolut Vodka", "Saaremaa Gin"],
          keskiga: ["Kohv piimaga", "Saku Original", "Rock"],
          vana: ["Kraanivesi", "Vana Tallinn", "Laua Viin"]
        },
        "Narva haigla": {
          noor: ["Coca-Cola", "Somersby siider", "Sparta"],
          keskiga: ["Kali", "Laua Viin", "Jägermeister"],
          vana: ["Mullivesi", "Absolut Vodka", "Viin Saaremaa"]
        },
        "Pärnu haigla": {
          noor: ["Red Bull", "Mernaya viin", "Claytons"],
          keskiga: ["Keefir", "Captain Morgan", "Viru Valge"],
          vana: ["Marjasmuuti", "Bock", "Valge Venelane"]
        },
        "Haapsalu haigla": {
          noor: ["Kali", "Saku on Ice", "Mernaya viin"],
          keskiga: ["Kraanivesi", "Rock", "Viru Valge"],
          vana: ["Kohv piimaga", "Rock", "Balletine's viski"]
        },
        "Järvamaa haigla (Paide)": {
          noor: ["Coca-Cola", "Laua Viin", "Heineken"],
          keskiga: ["Saku Original alkoholivaba", "Absolut Vodka", "Falima Ship brändi"],
          vana: ["Proteiinijook", "Vana Tallinn", "Alexander"]
        },
        "Rakvere haigla, Tapa haigla": {
          noor: ["Claytons", "Somersby siider", "Saku On Ice ploom õlu"],
          keskiga: ["Falima Ship brändi", "Alexander", "Absolut Vodka"],
          vana: ["Keefir", "Valge venelane", "Viin Saaremaa"]
        },
        "Valga haigla": {
          noor: ["Pepsi", "A.Le Coq G:N Grapefruit", "Saaremaa Gin"],
          keskiga: ["Sierra Tequila", "Black Velvet viski", "Keefir"],
          vana: ["Roheline tee", "Absolut Vodka", "Saku kuld"]
        },
        "Viljandi haigla": {
          noor: ["Piim", "Monster energiajook", "Laua Viin"],
          keskiga: ["Corona", "Heineken", "Falima Ship brändi"],
          vana: ["Banaanismuuti", "Piim", "Kakao"]
        },
        "Lõuna-Eesti haigla (Võru), Põlva haigla": {
          noor: ["Limpa limonaad", "Saku On Ice ploom õlu", "Red Bull"],
          keskiga: ["Budweiser", "Casino", "A. Le Coq Premium"],
          vana: ["Vana Tallinn", "Alexander", "Must tee"]
        },
        "Sünnitushaigla ei ole teada": {
          noor: ["Sprite", "Sparta", "Laua viin"],
          keskiga: ["Jäätee", "Jameson viski", "Muteki Jaapani viiski"],
          vana: ["Kakao", "Sierra Tequila", "Viru Valge"]
        },
        "Alaealine": {
          noor: ["Limpa limonaad", "Vesi", "Coca"]
        }
      },
      naine: {
        "Kuressaare haigla": {
          noor: ["Õunamahl", "Somersby siider", "Saaremaa Gin"],
          keskiga: ["Kohv piimaga", "Punane vein", "Saaremaa Gin"],
          vana: ["Saaremaa vesi", "Punane vein", "Viin Saaremaa"]
        },
        "Tartu Ülikooli Naistekliinik": {
          noor: ["Apelsinimahl", "Longero", "Mojito"],
          keskiga: ["Must kohv", "Valge vein", "Valge rumm"],
          vana: ["Mullivesi", "Punane vein", "midagi head ja kanget"]
        },
        "Ida-Tallinna keskhaigla, Pelgulinna sünnitusmaja (Tallinn)": {
          noor: ["Sprite", "Captain Morgan", "Longero"],
          keskiga: ["Kali", "Longero", "Kingsmill"],
          vana: ["Roheline tee", "Somersby siider", "Hennessy"]
        },
        "Keila haigla": {
          noor: ["Red Bull", "Saaremaa Gin", "Somersby siider"],
          keskiga: ["Kohv piimaga", "Heineken", "Saaremaa Gin"],
          vana: ["Keefir", "Hennessy", "Punane vein"]
        },
        "Rapla haigla, Loksa haigla, Hiiumaa haigla (Kärdla)": {
          noor: ["Pepsi", "Longero", "Captain Morgan"],
          keskiga: ["Mullivesi", "Corona", "Valge rumm"],
          vana: ["Kali", "Koch Tulivesi viin", "Vana Tallinn"]
        },
        "Ida-Viru keskhaigla (Kohtla-Järve, endine Jõhvi)": {
          noor: ["Segumahl", "Cooler", "Mojito"],
          keskiga: ["Jääkohv", "Kingsmill", "Valge vein"],
          vana: ["Õunamahl", "Hennessy", "Alexander"]
        },
        "Maarjamõisa kliinikum (Tartu), Jõgeva haigla": {
          noor: ["Kakao", "Saku Original", "Sparta"],
          keskiga: ["Kohv", "Punane vein", "Saarenaa Gin"],
          vana: ["Piim", "Viin Saaremaa", "Vana Tallinn"]
        },
        "Narva haigla": {
          noor: ["Limonaad", "Somersby siider", "Longero"],
          keskiga: ["Must tee", "Valge rumm", "Heineken"],
          vana: ["Banaanismuuti", "Laua Viin", "Absolut Vodka"]
        },
        "Pärnu haigla": {
          noor: ["Kraanivesi", "Captain Morgan", "Somersby siider"],
          keskiga: ["Piim", "Punane vein", "Jameson viski"],
          vana: ["Roheline tee", "Alexander", "Valge vein"]
        },
        "Haapsalu haigla": {
          noor: ["Sprite", "Martini", "Ballentine's viski"],
          keskiga: ["Kohv piimaga", "Corona", "Muteki Jaapani viski"],
          vana: ["Must tee", "Mozart Dark Chocolate liköör", "Hennessy"]
        },
        "Järvamaa haigla (Paide)": {
          noor: ["Jääkohv", "Longero", "Original Hartwall gin"],
          keskiga: ["Piim", "Jameson viski", "Punane vein"],
          vana: ["Mullivesi", "Vana Tallinn", "Koch Tulivesi viin"]
        },
        "Rakvere haigla, Tapa haigla": {
          noor: ["Ananassimahl", "Mojito", "Heineken"],
          keskiga: ["Kohv piimaga", "Valge vein", "Martini"],
          vana: ["Piim", "Punane vein", "Viin Saaremaa"]
        },
        "Valga haigla": {
          noor: ["Jäätee", "Red Bull", "Saku Original"],
          keskiga: ["Fizz mustikasiider", "Zubrowka Biala viin", "Valge vahuvein"],
          vana: ["Mullivesi", "Mozart Dark Chocolate liköör", "Southern Road Cabernet Sauvignon vein"]
        },
        "Viljandi haigla": {
          noor: ["Aura multinektar", "Kohvi", "Original Hartwall Long Drink sidrun"],
          keskiga: ["Viticcio Monile vein", "Hoggys Raspberry Dream siider", "Mozart Chocolate liköör"],
          vana: ["Kraanivesi", "Proteiinijook", "Keefir"]
        },
        "Lõuna-Eesti haigla (Võru), Põlva haigla": {
          noor: ["Sprite", "Long Drink Gin-Pineapple", "Cloudy Vintage siider"],
          keskiga: ["Monkey Gland", "Martini", "Karl Friedrich"],
          vana: ["Piim", "Roheline tee", "Absolut Vodka"]
        },
        "Sünnitushaigla ei ole teada": { // Alati ei pruugi olla isikukoodist võimalik haiglat määrata.
          noor: ["Juissi", "Asahi Super Dry õlu", "Saaremaa Gin"],
          keskiga: ["Proteiinijook", "Laua Viin", "Rock"],
          vana: ["Must tee", "Jägermeister", "Mozart Chocolate liköör"]
        },
        "Alaealine": {
          noor: ["Fanta", "Vesi", "Piim"] // Alaealistele me alkoholi ei soovita
        }
      }
    };

  let vanuseGrupp = vanus < 35 ? 'noor' : vanus < 55 ? 'keskiga' : 'vana'; // Määrab, mis vahemikud on mingile vanusegrupile
  let suguJoogid = joogid[sugu];
  if (suguJoogid && suguJoogid[haigla] && suguJoogid[haigla][vanuseGrupp]) {
    return suguJoogid[haigla][vanuseGrupp];
  }
  return ['Soovitused puuduvad'];
}

/** 
 * See on funktsioon, mis kutsutakse esile pealeht.html kaudu.
 * Funktsioon käivitab funktsioonid onKorrektneIsikukood, infoIsikukoodist ja soovitatudJoogid
 * Funktsioon tagastab saadud info pealehele.
*/
function saadaIsikukood() {
  const ikood = document.getElementById("ikood").value;
  const joogisoovitusedEl = document.getElementById("joogisoovitused");
  const errorEl = document.getElementById("error");
  
  joogisoovitusedEl.innerHTML = "";
  errorEl.innerHTML = "";

  if (!onKorrektneIsikukood(ikood)) {
    errorEl.innerHTML = "<p class='isikuerror'>Pole korrektne isikukood</p>"; // Tagastus, kui kontrolli põhjal oli isikikood vigane. class abil on võimalik css failis värvi muuta
    return;
  }

  const { sugu, vanus, haigla } = infoIsikukoodist(ikood);
  const joogid = soovitatudJoogid(sugu, vanus, haigla);
  
  joogisoovitusedEl.innerHTML = "<h2 class='soovitus'>Soovitame järgmisi jooke:</h2>" +
                                joogid.map(jook => `<p class='joogisoovitus'>${jook}</p>`).join(''); // Tagstab joogisoovitused üksteise all. class abil saab css failis reavahet vähendada
}