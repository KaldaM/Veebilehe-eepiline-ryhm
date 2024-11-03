from datetime import datetime

def info_isikukoodist(isikukood_str):
    isikukood_list = [int(x) for x in isikukood_str]

    if isikukood_list[0] in [1, 3, 5, 7]:
        sugu = 'mees'
    if isikukood_list[0] in [2, 4, 6, 8]:
        sugu = 'naine'

    if  isikukood_list[0] < 3:
        aasta = '18' + str(isikukood_list[1]) + str(isikukood_list[2])
    if isikukood_list[0] < 5 and isikukood_list[0] > 2:
        aasta = '19' + str(isikukood_list[1]) + str(isikukood_list[2])
    if isikukood_list[0] >= 5:
        aasta = '20' + str(isikukood_list[1]) + str(isikukood_list[2])

    kuu_nr = str(isikukood_list[3]) + str(isikukood_list[4])
    paeva_nr = str(isikukood_list[5]) + str(isikukood_list[6])
    date_string = (f'{aasta}-{kuu_nr}-{paeva_nr}')
    synni_kuupaev = datetime.strptime(date_string, '%Y-%m-%d').date()
    praegune_kuupaev = datetime.now().date()

    vanus = praegune_kuupaev.year - synni_kuupaev.year - ((praegune_kuupaev.month, praegune_kuupaev.day) < (synni_kuupaev.month, synni_kuupaev.day))
    haigla = 'Alaealine'


    if int(aasta) < 2013:
        haigla_nr = int(str(isikukood_list[7]) + str(isikukood_list[8]) + str(isikukood_list[9]))
        if haigla_nr in range(1, 11): haigla = 'Kuressaare haigla'
        if haigla_nr in range(11, 20): haigla = 'Tartu Ülikooli Naistekliinik'
        if haigla_nr in range(21, 151): haigla = 'Ida-Tallinna keskhaigla, Pelgulinna sünnitusmaja (Tallinn)'
        if haigla_nr in range(151, 161): haigla = 'Keila haigla'
        if haigla_nr in range(161, 221): haigla = 'Rapla haigla, Loksa haigla, Hiiumaa haigla (Kärdla)'
        if haigla_nr in range(221, 271): haigla = 'Ida-Viru keskhaigla (Kohtla-Järve, endine Jõhvi)'
        if haigla_nr in range(271, 371): haigla = 'Maarjamõisa kliinikum (Tartu), Jõgeva haigla'
        if haigla_nr in range(371, 421): haigla = 'Narva haigla'
        if haigla_nr in range(421, 471): haigla = 'Pärnu haigla'
        if haigla_nr in range(471, 491): haigla = 'Haapsalu haigla'
        if haigla_nr in range(491, 521): haigla = 'Järvamaa haigla (Paide)'
        if haigla_nr in range(521, 571): haigla = 'Rakvere haigla, Tapa haigla'
        if haigla_nr in range(571, 601): haigla = 'Valga haigla'
        if haigla_nr in range(601, 651): haigla = 'Viljandi haigla'
        if haigla_nr in range(651, 701): haigla = 'Lõuna-Eesti haigla (Võru), Põlva haigla'
        if haigla_nr not in range(1, 701): haigla = 'Sünnitushaigla ei ole teada'

        return (sugu, vanus, haigla)


def on_korrektne_isikukood(isikukood_str):
    isikukood_list = [int(x) for x in isikukood_str]
    kontroll_nr_koodil = isikukood_list[10]
    samm1 = isikukood_list[0] * 1 + isikukood_list[1] * 2 + isikukood_list[2] * 3 + isikukood_list[3] * 4 + isikukood_list[4] * 5 + isikukood_list[5] * 6 + isikukood_list[6] * 7 + isikukood_list[7] * 8 + isikukood_list[8] * 9 + isikukood_list[9] * 1
    samm2 = samm1 % 11
    if samm2 < 10:
        kontroll_nr = samm2
    if samm2 == 10:
        samm3 = isikukood_list[0] * 3 + isikukood_list[1] * 4 + isikukood_list[2] * 5 + isikukood_list[3] * 6 + isikukood_list[4] * 7 + isikukood_list[5] * 8 + isikukood_list[6] * 9 + isikukood_list[7] * 1 + isikukood_list[8] * 2 + isikukood_list[9] * 3
        samm4 = samm3 % 11
        if samm4 < 10:
            kontroll_nr = samm4
        else:
            kontroll_nr = 0
    if kontroll_nr_koodil == kontroll_nr:
        return True
    else:
        return False


def soovitatud_joogid(sugu, vanus, haigla):
     sonastik = {
         ('mees', 'Kuressaare haigla'): {
             'noor': ['Segumahl', 'Saaremaa tuulik', 'Viin Saaremaa'],
             'keskiga': ['Must kohv', 'Rock', 'Viin Saaremaa'],
             'vana': ['Mineraalvesi', 'Balletine\'s viski', 'Viin Saaremaa']
         },
         ('naine', 'Kuressaare haigla'): {
             'noor': ['Õunamahl','Sommersby siider', 'Saaremaa Gin'],
             'keskiga': ['Kohv piimaga', 'Punane vein', 'Saaremaa Gin'],
             'vana': ['Mineraalvesi', 'Punane vein', 'Viin Saaremaa']
         },
         ('mees', 'Tartu Ülikooli Naistekliinik'): {
             'noor': ['Juissi', 'A.Le.Coq Premium', 'Laua Viin', 'Sparta'],
             'keskiga': ['Alkoholivaba Premium', 'Alexander', 'Absolut Vodka'],
             'vana': ['Kraanivesi', 'Alexander', 'Valge venelane']
         },
         ('naine', 'Tartu Ülikooli Naistekliinik'): {
             'noor': ['Apelsinimahl', 'Longero', 'Mojito'],
             'keskiga': ['Must kohv', 'Valge vein', 'Valge rumm'],
             'vana': ['Mullivesi', 'Punane vein', 'midagi head ja kanget']
         },
         # Siia tulevad ylejaanud haiglad ka veel
         ('mees', 'Sünnitushaigla ei ole teada'): {
             'noor': ['!', '@', '#'],
             'keskiga': ['$', '%', '^'],
             'vana': ['Q', 'W', 'E']
         },
         ('naine', 'Sünnitushaigla ei ole teada'): {
             'noor': ['A', 'S', 'D'],
             'keskiga': ['Z', 'X', 'C'],
             'vana': ['F', 'G', 'H']
         },
         ('mees', 'Alaealine'): {
             'noor': ['Limonaad', 'Vesi', 'Coca']
         },
         ('naine', 'Alaealine'): {
             'noor': ['Fanta', 'Vesi', 'Piim']
         }
     }

     if vanus < 18:
         haigla = 'Alaealine'

     vanuse_grupp = 'noor' if vanus < 35 else 'keskiga' if vanus < 55 else 'vana'
     joogi_valik = sonastik.get((sugu, haigla))
     joogi_valik_vanusega = joogi_valik[vanuse_grupp]
     return joogi_valik_vanusega


idkood = input('Sisesta isikukood: ')

if on_korrektne_isikukood(idkood):
    info = info_isikukoodist(idkood)
    print(soovitatud_joogid(info[0], info[1], info[2]))

else:
    print('Pole korrektne isikukood')
