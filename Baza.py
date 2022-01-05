from neo4j import GraphDatabase
import datetime

class Baza:

    def __init__(self):
        try:
            self.driver = GraphDatabase.driver('bolt://localhost:7687', auth=('neo4j', 'levak123'))
        except Exception as e:
            print("Failed to create the driver:", e)

    def close(self):
        self.driver.close()

    def returnByCity(self, city, db=None):
        if self.driver is None:
            print("Driver not initialized!")
        session = None
        response = None

        try:
            session = self.__driver.session(database=db) if db is not None else self.driver.session()
            pom='MATCH (m:Street)-[r:BELOWS_TO]->(n:City {name: \''+city+'\'}) \n return m'
            response=list(session.run(pom))
            
        finally: 
            if session is not None:
                session.close()
        return response

    def returnByStreet(self, city, street, db=None):
        if self.driver is None:
            print("Driver not initialized!")
        session = None
        response = None
        try:
            session = self.__driver.session(database=db) if db is not None else self.driver.session()
            response=list(session.run('MATCH (c:Case)-[:CASE_TO]->(m:Street {name: \''+street+'\'})-[r:BELOWS_TO]->(n:City {name: \''+city+'\'}) \n return c'))

        finally: 
            if session is not None:
                session.close()
        return response

    def newCasePolice(self, case, db=None):
        if self.driver is None:
            print("Driver not initialized!")
        session = None
        response = None
        try: 
            indicate=0
            session = self.__driver.session(database=db) if db is not None else self.driver.session() 
            if list(session.run(self.cityExists(case['City'])))==[]:
                raise Exception('')
            indicate+=1
            if list(session.run(self.streetExists(case['City'], case['Street'][0])))==[]:
                raise Exception('')
            indicate+=1
            response = list(session.run(self.queryNewCase(case)))
        except Exception as e:
            match indicate:
                case 0:
                    response = list(session.run('create (n:City{name:\''+case['City']+'\'}) create (m:Street{name:\''+case['Street'][0]+'\', cases:0})-[:BELOWS_TO]->(n) '))
                    response = list(session.run(self.queryNewCase(case)))
                case 1:
                    response = list(session.run('match (n:City) where n.name=\''+ case['City']+'\' create (m:Street{''name:\''+case['Street'][0]+'\', cases:0})-[:BELOWS_TO]->(n)'))
                    response = list(session.run(self.queryNewCase(case)))
                case _:
                    print(e)
        finally: 
            if session is not None:
                session.close()
            
        return response

    def queryNewCase(self, case):
        return 'match (n:City) where n.name=\''+case['City']+'\'\n match (m:Street) where m.name=\''+case['Street'][0]+'\' and (m)-->(n)\n set m.cases=m.cases+1 \n create (c:Case{number:\''+case['Street'][1]+'\', alkotest:\''+case['alkotest']+'\', speedtest:\''+case['speedtest']+'\', adddes:\''+case['adddes']+'\', time:datetime()})-[:CASE_TO]->(m)'

    def cityExists(self, city):
        return 'match (n:City) where n.name=\''+city+'\' return (n)'

    def streetExists(self, city, street):
        return 'match (n:City) where n.name=\''+city+'\'\n match (m:Street) where m.name=\''+street+'\' and (m)-->(n) return (m)'
