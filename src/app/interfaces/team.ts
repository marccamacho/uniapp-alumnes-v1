import { Person } from './person'
import { Tag } from './tag'

export interface Team {
  name: string;
  visibility?: string;
  policy?: string;
  description?: string;
  rid?: string;
  memberships?: Membership[];
}

export interface Membership {
  name: string;
  rid?:string;
  isDefaultMembership: boolean;
  membershipType: Tag[];
  members: Person[];
}

// TEAM
// name: 		és el nom del grup "Claustre de professors", "Educació infantil", "P3A"
// visibility: determina com serà la visibilitat per als usuaris:
//  public: 		visible per a tothom
//  users360: 		usuaris de l’aplicatiu
//  office: 		serà visible per als usuaris de l’entitat organitzadora
//  members:	 	usuaris del grup (inclou el Manager)
//  secret: 		grup ocult
// policy: 	determina com es pot donar d’alta o baixa d’un grup.
//  free: 			entrada i sortida lliure
//  askAuth:		es demana i IsManagerOf valida
//  managed:		el Manager gestiona l’entrada i sortida
//  shareTeam		es genera un enllaç per a entrar
// isManager: un link
// Extres:
// shortName: "Claustre", "Ed. Inf.", "I3A"
// description: Una breu descripció de l'equip.

// MEMBERSHIP
// name (opcional, si no s'especifica es mostra el MembershipTag)
// isDefaultMembership (booleà) Quan un Membership té aquesta propietat aleshores podem assignar persones a teams i automàticament quedaran en aquest Membership. Si s'intenta assignar una persona en un Team i no disposa de cap Membership amb aquesta propietat=True, aleshores hauria de retonar que no s'ha pogut fer. Quan es canvia una política d'admissió a free, s'ha de fer la comprovació que existeix un Membership que té aquest atribut a True.
