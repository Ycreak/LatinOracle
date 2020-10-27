   # _____                  __ 
  # / ____|                /_ |
 # | |     _ __ ___  __ _   | |
 # | |    | '__/ _ \/ _` |  | |
 # | |____| | |  __/ (_| |  | |
  # \_____|_|  \___|\__,_|  |_|

  # Philippe Bors 1773585
  # Luuk Nolden 1370898
  # Computational Creativity 1
  # Leiden University
  # October 2020

# Class imports
import random
import json
import pandas as pd
# Ctrl + Shift + 2 for Docstring


# Decliner
from cltk.stem.latin.declension import CollatinusDecliner
# Hexameter Scanner
from cltk.prosody.latin.hexameter_scanner import HexameterScanner

class PoemGenerator:
    """ Class Generates a poem in Latin Hexameter
    """

    language = 'latin'
    corpus = 'latin_models_cltk'

    genitiveChance = 30
    ablativeChance = 30
    subClauseChance = 50

    dictionary = {}

    oracle = ''

    def __init__(self):
        """
        """        
        print('hello oracle')

        # Import the Latin Corpus
        self.ImportCorpus(self.language, self.corpus)
        # Create the dictionary from the CSV files
        self.dictionary = self.CreateJSON()
        # Generate a sentence
        poem = self.GenerateSentence()
        # Add a subclause
        if self.PercentageBool(self.subClauseChance):
            poem += self.PickSubClause()
            poem += self.GenerateSentence()

        self.oracle = poem.upper()
        print('succes!')

    # def AddExtraForms(self, )
    def GenerateSentence(self):
        """Generates a sentence

        Returns:
            string: sentence
        
        Todo:
            generate participia
            generate aci and inf constructions
            allow for first and second person
        """        
        
        # Find a verb
        verb = self.random_json_val(self.dictionary, 'verbs')
        # Find a nominative, make it singular or plural
        noun = self.random_json_val(self.dictionary, 'subst')
        # Adhere nominative to form
        noun, verb = self.MatchNomVerb(noun, verb)
        # Start creating the poem
        poem = noun['nom']
        
        if self.PercentageBool(self.genitiveChance):
            poem += self.GenerateForm('gen')['gen']

        if verb['place'] >= 2:
            # Add Accusative
            poem += self.GenerateForm('acc')['acc']
            if self.PercentageBool(self.genitiveChance):
                poem += self.GenerateForm('gen')['gen']

        if verb['place'] >= 3:
            # Add Dative
            poem += self.GenerateForm('dat')['dat']
            if self.PercentageBool(self.genitiveChance):
                poem += self.GenerateForm('gen')['gen']         

        # Add Ablativi using chance. Multiple can be added. 
        poem = self.AddSatellites(poem)
        
        poem += ' ' + verb['form'].strip()
        
        return poem

    def PickSubClause(self):
        return ', ' + self.random_json_val(self.dictionary, 'clause')['word'] + ' '

    def AddSatellites(self, poem):
        counter = 0
        while True:
            if self.PercentageBool(self.ablativeChance):
                if counter > 0:
                    poem += 'que ' + self.GenerateForm('abl')['abl'].strip()
                else:
                    poem += self.GenerateForm('abl')['abl'].strip()
                counter += 1
            else:
                break

        return poem.strip()

    def GenerateForm(self, name):
        lemma = self.random_json_val(self.dictionary, 'subst')

        if random.randint(0, 1) == 0: # Singular
            form = name + '_S' 
        else: 
            form = name + '_P' 

        lemma[name] = self.Decliner(lemma['word'], form)
        return lemma


    def MatchNomVerb(self, nom, verb):
        if nom['person'] == 3:
            if random.randint(0, 1) == 0: # Singular
                nomForm = 'nom_S'
                verbForm = 'v3spia'
            else: # Plural  
                nomForm = 'nom_P'
                verbForm = 'v3ppia'

            nom['nom'] = self.Decliner(nom['word'], nomForm)
            verb['form'] = self.Decliner(verb['word'], verbForm)
           
        return nom, verb

    def random_json_val(self, json_obj, k):
        return random.choice(json_obj[k])

    def PercentageBool(self, percent):
        """Generates true or false based on the given percentage

        Args:
            percent (int): percentage of cases that should return true

        Returns:
            bool: bool
        """        
        return random.randrange(100) < percent

    def ImportCorpus(self, language, corpus):
        """ Imports the given language and corpus given

        Args:
            language (string): language to import corpus from
            corpus (string): corpus to be imported
        """        
        from cltk.corpus.utils.importer import CorpusImporter
        corpus_importer = CorpusImporter(language)
        corpus_importer.import_corpus(corpus)

    def Decliner(self, word, declination):
        # Declinations and there corresponding number
        declinationDict = {
            "nom_S" : 0,
            "voc_S" : 1,
            "acc_S" : 2,
            "gen_S" : 3,
            "dat_S" : 4,
            "abl_S" : 5,

            "nom_P" : 6,
            "voc_P" : 7,
            "acc_P" : 8,
            "gen_P" : 9,
            "dat_P" : 10,
            "abl_P" : 11,

            "v1spia" : 0,
            "v2spia" : 1,
            "v3spia" : 2,
            "v1ppia" : 3,
            "v2ppia" : 4,
            "v3ppia" : 5,
        }

        # Find the corresponding number
        x = declinationDict[declination]
        # Import the decliner
        decliner = CollatinusDecliner()

        # print(decliner.decline(word))

        return decliner.decline(word, flatten=True)[x] + ' '

    def CreateJSON(self):
        # Open the dictionary with nouns and verbs.
        with open('dict.json') as f:
            dictionary = json.load(f)
        
        dfS = json.loads(pd.read_csv('Wordlists/subst.csv', sep=';').to_json(orient="records"))
        dfV = json.loads(pd.read_csv('Wordlists/verbs.csv', sep=';').to_json(orient="records"))
        dfC = json.loads(pd.read_csv('Wordlists/clause.csv', sep=';').to_json(orient="records"))

        dictionary["subst"] = dfS
        dictionary["verbs"] = dfV
        dictionary["clause"] = dfC

        return dictionary

    def HexameterScanner(self, sentence):
        # - u u - u u - u u | - u u - u u - x
        text = 'Albanique patres, atque altae moenia matri.'
        # text = 'dominum dominum '
        self.HexameterScanner(text)
        # Using readlines() 
        file1 = open('virgil.txt', 'r') 
        Lines = file1.readlines() 
        
        # Strips the newline character 
        for line in Lines: 
            self.HexameterScanner(line.strip())    
    
    
        from cltk.prosody.latin.scanner import Scansion
        from cltk.prosody.latin.clausulae_analysis import Clausulae
        
        from cltk.prosody.latin.metrical_validator import MetricalValidator

        # text = 'dominum mater manet'

        # s = Scansion()
        # c = Clausulae()

        # prosody = s.scan_text(text)
        # print(prosody)
        # print(c.clausulae_analysis(prosody))
        
        
        # exit(0)
        scanner = HexameterScanner()

        output = scanner.scan(sentence)
        print(output, '\n')
        # print(output.meter)
        # print(output.valid)
        print(output.scansion)
        print(MetricalValidator().is_valid_hexameter(output.scansion))