import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';

import { environment }      from '../../environments/environment';

import { Project }          from '../interfaces/project';
import { Standard }         from '../interfaces/standard';
import { Tag }              from '../interfaces/tag';
import { Person }           from '../interfaces/person';
import { Document }         from '../interfaces/document';
import { Team, Membership } from '../interfaces/team';

import { HttpHeaders }      from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ConnectionService {

  httpOptions: Object = {};
  httpOptionsGoogle: Object = {};
  httpOptionsForm: Object = {};

  apiHost = environment.apiHost;
  fullApiHost = 'http://' + this.apiHost + '/api/v1';
  fullApiHostV2 = 'http://' + this.apiHost + '/api/v2';
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'Basic ' + btoa(localStorage.getItem('edu360-token') + ':'),
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.httpOptionsForm = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'Basic ' + btoa(localStorage.getItem('edu360-token') + ':'),
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.httpOptionsGoogle = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('edu360-GId')
      })
    };
  }

  getStandards() {
    return this.http.get<any>("http://" + this.apiHost + "/api/v1/standards", this.httpOptions);
  }

  getOnlyStandard(standardId : any) {
    return this.http.get<any>("http://" + this.apiHost + "/api/v1/standards/" + standardId, this.httpOptions);
  }

  getStandard(standardId : any) {
    return this.http.get<any>("http://" + this.apiHost + "/api/v1/standards/" + standardId + "?relatives=pd&marks=a", this.httpOptions);
  }

  getStandardWithoutMarks(standardId : any) {
    return this.http.get<any>("http://" + this.apiHost + "/api/v1/standards/" + standardId + "?relatives=pd", this.httpOptions);
  }

  getStandardAndSons(standardId : any){}

  getStandardTree(standardId : any) {
    console.log("getStandardTree");
    return this.http.get<any>("http://" + this.apiHost + "/api/v1/standards/" + standardId + "?relatives=ad&marks=a", this.httpOptions);
  }

  getStandardTreeForStudent(standardId : any, studentId : any) {
    return this.http.get<any>(this.fullApiHost + "/standards/" + standardId +"?relatives=ad&marks=a&pId="+studentId, this.httpOptions);
  }


  getFilteredStandards(aIds : any, sIds : any, tagIds : any) {
    let sAIds = '';
    let sTagIds = '';
    let sSIds = '';

    if (aIds.length > 0) {
      sAIds = "AcademicScope=" + aIds.join('&AcademicScope=');
    }
    if (tagIds.length > 0) {
      sTagIds = '&tag=' + tagIds.join('&tag=');
    }
    if (sIds.length > 0) {
      sSIds = '&Stage=' + sIds.join('&Stage=');
    }
    return this.http.get<any>(this.fullApiHost + "/standards?" + sAIds + sTagIds + sSIds, this.httpOptions);
  }

  getDoubleFilteredStandards(aIds : any, sIds : any) {
    let sAIds = '';
    let sSIds = '';

    if (aIds.length > 0) {
      sAIds = "&a=" + aIds.join('&a=');
    }
    if (sIds.length > 0) {
      sSIds = '&s=' + sIds.join('&s=');
    }
    return this.http.get<any>(this.fullApiHost + "/standards/filtered?" + sAIds + sSIds, this.httpOptions);

  }

  getFilteredTextStandards(qT : any) {
    return this.http.get<any>(this.fullApiHost + "/standards?t=" + qT, this.httpOptions);
  }

  getFavStandards(pId : any) {
    return this.http.get<any>(this.fullApiHost + "/standards?p=" + pId, this.httpOptions);
  }

  getStandardsWithoutParents() {
    return this.http.get<any>(this.fullApiHost + "/standards/roots", this.httpOptions);
  }

  getStandardsTreeFlatList() {
    return this.http.get<any>(this.fullApiHost + "/standards/flattree", this.httpOptions);
  }

  addFavStandard(sId : any, pId : any) {
    return this.http.post<any>(this.fullApiHost + "/standards/" + sId + "/favs/" + pId, {}, this.httpOptions);
  }

  removeFavStandard(sId : any, pId : any) {
    return this.http.delete<any>(this.fullApiHost + "/standards/" + sId + "/favs/" + pId, this.httpOptions);
  }

  newStandard(standard : any) {
    return this.http.post<any>(this.fullApiHost + "/standards", standard, this.httpOptions);
  }

  addStandardToStandard(standardId : any, name : any) {
    let info = { "name": name, "parentRid": standardId };
    return this.http.post<any>(this.fullApiHost + "/standards", info, this.httpOptions);
  }

  removeStandardFromStandard(parentRid : any, standardRid : any) {
    let info = {
      "removeParentRid": parentRid
    };
    return this.http.put<any>(this.fullApiHost + "/standards/"+standardRid.slice(1), info, this.httpOptions);
  }

  connectStandardToStandard(stParent : any, stSon : any) {
    let info = { "parentRid": stParent, "existingRid": stSon };
    return this.http.post<any>(this.fullApiHost + "/standards", info, this.httpOptions);
  }

  updateStandard(standard : any) {
    return this.http.put<any>(this.fullApiHost + "/standards/" + standard.rid.slice(1), standard, this.httpOptions);
  }

  deleteStandard(standard : any) {
    return this.http.delete<any>(this.fullApiHost + "/standards/" + standard.rid.slice(1), this.httpOptions);
  }

  addStandardToActivity(activityId : any, standardId : any) {
    return this.http.post<Standard>(this.fullApiHost + "/projects/activities/" + activityId + "/standards", { "standardId": standardId }, this.httpOptions);
  }

  removeStandardFromActivity(activityId : any, standardId : any) {
    return this.http.delete(this.fullApiHost + "/projects/activities/" + activityId + "/standards/" + standardId, this.httpOptions);
  }


  getTags() {
    return this.http.get<any>(this.fullApiHost + "/tags", this.httpOptions)
  }

  addTagToVertex(tagId : any, vertexId : any) {
    return this.http.post<any>(this.fullApiHost + "/tags/" + tagId + "/add/" + vertexId, null, this.httpOptions);
  }

  removeTagFromVertex(tagId : any, vertexId : any) {
    return this.http.post<any>(this.fullApiHost + "/tags/" + tagId + "/remove/" + vertexId, null, this.httpOptions);
  }

  newMark(mark : any) {
    return this.http.post<any>(this.fullApiHost + "/standards/automarks", mark, this.httpOptions);
  }

  newMarkFromTeacher(mark : any) {
    return this.http.post<any>(this.fullApiHost + "/standards/marks", mark, this.httpOptions);
  }

  getMarksOfSS(st : any, s : any) {
    return this.http.get<any>(this.fullApiHost + "/standards/marks?s=" + s + "&st=" + st, this.httpOptions);
  }

  getMarksOfSSversion2(st : any, sl : any) {
    const slQueryString = sl.join('&sl=');
    return this.http.get<any>(this.fullApiHost + "/standards/marks?sl=" + slQueryString + "&st=" + st, this.httpOptions);
  }

  getMarksOfTeamAndStandard(teamId : any, standardId : any) {
    return this.http.get<any>(this.fullApiHost + "/standards/marks?team=" + teamId + "&s=" + standardId, this.httpOptions);
  }

  getMarksOfSSA(st : any, s : any, a : any) {
      return this.http.get<any>(this.fullApiHost + "/standards/marks?s="+s+"&a="+a+"&st="+st, this.httpOptions);
  }

  getLastMarksForStudentAndLimitDate() {
    return this.http.get<any>(this.fullApiHost + "/standards/marks/report/lastweek", this.httpOptions);
  }

  getLastMarksForTeacherAndLimitDate(authorId : any) {
    return this.http.get<any>(this.fullApiHost + "/standards/marks/report/lastweek?authorId=" + authorId, this.httpOptions);
  }

  deleteMark(markId : any){
    return this.http.delete(this.fullApiHost + "/standards/marks/" + markId,this.httpOptions);
  }

  getProjects() {
    return this.http.get<any>(this.fullApiHost + "/projects", this.httpOptions);
  }

  getActivitiesWithUserRealizations() {
    return this.http.get<any>(this.fullApiHost + "/projects/realizations", this.httpOptions);
  }

  getNextActivities() {
    return this.http.get<any>(this.fullApiHost + "/projects/agenda", this.httpOptions);
  }

  getProgramedActivitiesOfGroup(tagId : any) {
    return this.http.get<any>(this.fullApiHost + "/projects/agendapublica?tagId=" + tagId, this.httpOptions);
  }

  getProject(projectId : any) {
    return this.http.get<any>(this.fullApiHost + "/projects/" + projectId, this.httpOptions);
  }

  updateProject(project : any) {
    return this.http.put<Project>(this.fullApiHost + "/projects/" + project.rid.slice(1), project, this.httpOptions);
  }

  deleteProject(projectId : any) {
      return this.http.delete<Project>(this.fullApiHost + "/projects/"+projectId,this.httpOptions);
  }

  deleteProject3F(projectId : any) {
      return this.http.delete<Project>(this.fullApiHost + "/projects/"+projectId+"/withactivities",this.httpOptions);
  }

  addTeacherToProject(pData : any, pId : any) {
    return this.http.post<any>(this.fullApiHost + "/projects/"+pId+"/teachers",pData, this.httpOptions);
  }

  removeTeacherFromProject(tId : any, pId : any) {
    return this.http.delete<any>(this.fullApiHost + "/projects/"+pId+"/teachers/"+tId, this.httpOptions);
  }

  addStudentToProject(pData : any, pId : any) {
    return this.http.post<any>(this.fullApiHost + "/projects/"+pId+"/students",pData, this.httpOptions);
  }

  removeStudentFromProject(tId : any, pId : any) {
    return this.http.delete<any>(this.fullApiHost + "/projects/"+pId+"/students/"+tId, this.httpOptions);
  }

  getProjectsOfGroup(tagName : any) {
    return this.http.get<any>(this.fullApiHost + "/projects?g=" + tagName, this.httpOptions);
  }

  getProjectsOfGroupAndTeacher(tagName : any, tId : any) {
    return this.http.get<any>(this.fullApiHost + "/projects?g=" + tagName + "&tId=" + tId, this.httpOptions);
  }

  getMyProjects(){
    return this.http.get<any>(this.fullApiHost + "/projects?r=student", this.httpOptions);
  }

  getProjectsForPersonFromFavStandards(){
    return this.http.get<any>(this.fullApiHost + "/projects?source=byFav", this.httpOptions);
  }

  newProject3F(info : any) {
    return this.http.post<any>(this.fullApiHost + "/projects/3f", info, this.httpOptions);
  }

  newActivityGroup(info : any) {
    return this.http.post<any>(this.fullApiHost + "/projects/activitysets", info, this.httpOptions);
  }

  newActivity(projectId : any, activity : any) {
    return this.http.post<any>(this.fullApiHost + "/projects/"+projectId+"/activities",activity, this.httpOptions);
  }

  getActivity(activityId : any) {
    return this.http.get<any>(this.fullApiHost + "/projects/activities/" + activityId, this.httpOptions);
  }

  removeActivityFromProject(pId : any, aId : any) {
    return this.http.delete<any>(this.fullApiHost + "/projects/"+pId+"/activities/"+aId, this.httpOptions);
  }

  getProjectsByStudent() {
    return this.http.get<any>(this.fullApiHost + "/projects?r=student", this.httpOptions);
  }

  getStudentsOfUser() {
    return this.http.get<any[]>(this.fullApiHost + "/students", this.httpOptions);
  }

  getTeamsIamTeacher() {
    return this.http.get<any[]>(this.fullApiHost + "/teams?t=iteach", this.httpOptions);
  }

  getTeamsITeachWithStudents() {
    return this.http.get<any>(this.fullApiHost + "/teams?t=iteach&options=withstudents", this.httpOptions);
  }

  getFullsSeguiment3F() {
    return this.http.get<any[]>(this.fullApiHost + "/projects/fullsseguiment", this.httpOptions);
  }

  getFullsSeguiment3FByStatus(statusList : []) {
    let argsList = statusList.map(s => 's=' + s).join('&');
    return this.http.get<any[]>(this.fullApiHost + "/projects/fullsseguiment?" + argsList, this.httpOptions);
  }

  getFullsSeguiment3FProfe(profeId : any) {
    return this.http.get<any[]>(this.fullApiHost + "/projects/fullsseguiment?teacher=" + profeId, this.httpOptions);
  }

  getFullsSeguiment3FStudent(studentId : any) {
    return this.http.get<any[]>(this.fullApiHost + "/projects/fullsseguiment?student=" + studentId, this.httpOptions);
  }

  getFullsSeguiment3FStudentByStatus(studentId : any, statusList : []) {
    let argsList = statusList.map(s => 's=' + s).join('&');
    return this.http.get<any[]>(this.fullApiHost + "/projects/fullsseguiment?role=student&" + argsList, this.httpOptions);
  }

  getFullsSeguiment3FOfProject(projectId : any) {
    return this.http.get<any[]>(this.fullApiHost + "/projects/fullsseguiment?project=" + projectId, this.httpOptions);
  }

  getFullSeguiment3F(fullId : any) {
    return this.http.get<any>(this.fullApiHost + "/projects/fullsseguiment/" + fullId, this.httpOptions);
  }

  newFullSeguiment3F(info : any) {
    return this.http.post<any>(this.fullApiHost + "/projects/fullsseguiment", info, this.httpOptions);
  }

  updateFullSeguiment3F(full : any) {
    return this.http.put<any>(this.fullApiHost + "/projects/fullsseguiment/" + full.rid.slice(1), full, this.httpOptions);
  }

  sendMailFullSeguimentNewStatus(full : any) {
    return this.http.put<any>(this.fullApiHost + "/projects/fullsseguiment/" + full.rid.slice(1) + "/mail/newstatus", full, this.httpOptions);
  }

  sendMailFullSeguimentPeticioFeedback(full : any) {
    return this.http.put<any>(this.fullApiHost + "/projects/fullsseguiment/" + full.rid.slice(1) + "/mail/askfeedback", full, this.httpOptions);
  }

  updateActivity(aId : any, info : any) {
    return this.http.put<any[]>(this.fullApiHost + "/projects/activities/" + aId, info, this.httpOptions);
  }

  uploadDocument(doc : any) {
    return this.http.post<Document>(this.fullApiHost + "/documents/upload", doc, this.httpOptionsForm);
  }

  newDocument(doc : any) {
    return this.http.post<Document>(this.fullApiHost + "/documents", doc, this.httpOptions);
  }

  removeDocument(doc : any) {
    return this.http.put<Document>(this.fullApiHost + "/documents/" + doc.rid.slice(1) + "/trash", doc, this.httpOptions);
  }

  updateDocument(doc : any) {
    return this.http.put<Document>(this.fullApiHost + "/documents/" + doc.rid.slice(1), doc, this.httpOptions);
  }

  getChecklists() {
    return this.http.get<any[]>(this.fullApiHost + "/checklists", this.httpOptions);
  }

  getChecklist(checklistId : any) {
    return this.http.get<any>(this.fullApiHost + "/checklists/" + checklistId, this.httpOptions);
  }

  newChecklist(info : any) {
    return this.http.post<any>(this.fullApiHost + "/checklists", info, this.httpOptions);
  }

  newChecklistItem(checklistId : any, info : any) {
    return this.http.post<any>(this.fullApiHost + "/checklists/" + checklistId + "/checklistitems", info, this.httpOptions);
  }

  updateChecklist(checklistId : any, info : any) {
    return this.http.put<any>(this.fullApiHost + "/checklists/" + checklistId, info, this.httpOptions);
  }

  updateChecklistItem(checklistId : any, checklistItemId : any, info : any) {
    return this.http.put<any>(this.fullApiHost + "/checklists/" + checklistId + "/checklistitems/" + checklistItemId, info, this.httpOptions);
  }

  updateChecklistItemOfFullChecklist(fullChecklistId : any, checklistItemId : any, info : any) {
    return this.http.put<any>(this.fullApiHost + "/checklists/fullschecklist/" + fullChecklistId + "/checklistitems/" + checklistItemId, info, this.httpOptions);
  }

  getFullChecklist(fullChecklistId : any) {
    return this.http.get<any>(this.fullApiHost + "/checklists/fullschecklist/" + fullChecklistId, this.httpOptions);
  }

  updateFullChecklist(fullChecklistId : any, info : any) {
    return this.http.put<any>(this.fullApiHost + "/checklists/fullschecklist/" + fullChecklistId, info, this.httpOptions);
  }

  removeChecklistItemFromChecklist(checklistId : any, checklistItemId : any) {
    return this.http.delete<any>(this.fullApiHost + "/checklists/"+checklistId+"/checklistitems/"+checklistItemId, this.httpOptions);
  }

  getFullsChecklistAsCorrector(correctorId : any) {
    return this.http.get<any[]>(this.fullApiHost + "/checklists/fullschecklist?corrector=" + correctorId, this.httpOptions);
  }

  getPeople() {
    return this.http.get<Person[]>(this.fullApiHost + "/persons", this.httpOptions);
  }

  getManagedTeams() {
    return this.http.get<Team[]>(this.fullApiHost + "/teams?t=managed", this.httpOptions);
  }

  getTeam(teamId : any) {
    return this.http.get<Team>(this.fullApiHost + "/teams/" + teamId, this.httpOptions);
  }

  getTeams() {
    return this.http.get<Team[]>(this.fullApiHost + "/teams", this.httpOptions);
  }

  getChecklistToCorrect() {
    return this.http.get<any[]>(this.fullApiHost + "/checklists?q=todo", this.httpOptions);
  }

  newFullChecklist(info : any) {
    return this.http.post<any>(this.fullApiHost + "/checklists/fullschecklist", info, this.httpOptions);
  }

  newTeam(team : any) {
      return this.http.post<Team>(this.fullApiHost + "/teams",team, this.httpOptions);
  }

  updateTeam(team : any) {
    return this.http.put<Team>(this.fullApiHost + "/teams/"+team.rid.slice(1),team,this.httpOptions);
  }

  deleteTeam(team : any) {
    return this.http.delete<Team>(this.fullApiHost + "/teams/"+team.rid.slice(1),this.httpOptions);
  }

  nouRol(team : any, dades : any) {
    return this.http.post<Membership>(this.fullApiHost + "/teams/"+team.rid.slice(1)+"/memberships",dades, this.httpOptions);
  }

  addPersonToMembership(teamId : any, membershipId : any, addInfo : any) {
      return this.http.post<Person>(this.fullApiHost + "/teams/"+teamId+"/memberships/"+membershipId+"/members",addInfo, this.httpOptions);
  }

  removePersonFromMembership(teamId : any, membershipId : any, personId : any, removeInfo : any) {
    return this.http.put<Person>(this.fullApiHost + "/teams/"+teamId+"/memberships/"+membershipId+"/members/"+personId,removeInfo, this.httpOptions);
  }

  updateMembership(teamId : any, m : any) {
    return this.http.put<Membership>(this.fullApiHost + "/teams/"+teamId+"/memberships/"+m.rid.slice(1),m, this.httpOptions);
  }

  deleteMembership(teamId : any, m : any) {
    return this.http.delete<Membership>(this.fullApiHost + "/teams/"+teamId+"/memberships/"+m.rid.slice(1), this.httpOptions);
  }

  checkMail(mail : any) {
    return this.http.get<any>(this.fullApiHost + "/users/check/" + mail, this.httpOptions);
  }

  createPerson(info : any) {
    return this.http.post<any>(this.fullApiHost + "/persons", info, this.httpOptions);
  }

  addContactData(personId : any, info : any) {
    return this.http.post<any>(this.fullApiHost + "/persons/" + personId + "/contactdata", info, this.httpOptions);
  }

  createUser(info : any) {
    return this.http.post<any>(this.fullApiHost + "/users", info, this.httpOptions);
  }

  getRegistrationFormsOfStudent() {
    return this.http.get<any[]>(this.fullApiHost + "/academics/registrationforms?forUser=true", this.httpOptions);
  }

  getRegistrationFormsOfStudentByRfid(rfId : any) {
    return this.http.get<any[]>(this.fullApiHost + "/academics/registrationforms?forStudent="+rfId, this.httpOptions);
  }

  getRegistrationForm(rfId : any) {
    return this.http.get<any>(this.fullApiHost + "/academics/registrationforms/"+rfId+"?doReport=true", this.httpOptions);
  }

  getAcademicCallsOfRegistrationForm(rf : any) {
    return this.http.get<any[]>(this.fullApiHost + '/academics/registrationforms/'+rf.rid.slice(1)+'/academiccalls', this.httpOptions);
  }
  
  getAcademicCallsOfRegistrationFormBeforeDate(rf : any, marksBeforeDate : any) {
    return this.http.get<any[]>(this.fullApiHost + '/academics/registrationforms/'+rf.rid.slice(1)+'/academiccalls?marksBeforeDate=' + marksBeforeDate, this.httpOptions);
  }

  getAcademicCallsOfRegistrationFormV2(rf : any) {
    return this.http.get<any[]>(this.fullApiHost + '/academics/registrationforms/'+rf.rid.slice(1)+'/academiccallsv2', this.httpOptions);
  }

  getAcademicCallsOfRegistrationFormV2String(rf : any) {
    return this.http.get<any[]>(this.fullApiHost + '/academics/registrationforms/'+rf+'/academiccallsv2', this.httpOptions);
  }

  getAcademicCallsOfSubject(subjectId : any) {
    return this.http.get<any[]>(this.fullApiHost + '/academics/subjects/' + subjectId + '/academiccalls', this.httpOptions);
  }

  getAcademicCallsOfSubjectv2(subjectId : any) {
    return this.http.get<any[]>(this.fullApiHost + '/academics/academiccalls?subjectId=' + subjectId, this.httpOptions);
  }

  getSubject(sId : any) {
    return this.http.get<any>(this.fullApiHost + "/academics/subjects/" + sId, this.httpOptions);
  }

  getSubjects() {
    return this.http.get<any>(this.fullApiHost + "/academics/subjects", this.httpOptions);
  }

  addTeacherToSubject(subjectId : any, info : any) {
    return this.http.post<any>(this.fullApiHost + "/academics/subjects/" + subjectId + "/teachers", info, this.httpOptions);
  }

  removeTeacherFromSubject(subjectId : any, teacherId : any) {
    return this.http.delete<any>(this.fullApiHost + "/academics/subjects/" + subjectId + "/teachers/" + teacherId, this.httpOptions);
  }

  addMarkWeight(info : any) {
    return this.http.post<any>(this.fullApiHost + "/academics/markweights", info, this.httpOptions);
  }

  updateMarkWeight(info : any) {
    return this.http.put<any>(this.fullApiHost + "/academics/markweights/" + info.rid.slice(1), info, this.httpOptions);
  }

  deleteMarkWeight(mwId : any) {
    return this.http.delete<any>(this.fullApiHost + "/academics/markweights/" + mwId, this.httpOptions);
  }

  getLearningPaths() {
    return this.http.get<any>(this.fullApiHostV2 + "/learningpaths", this.httpOptions);
  }

  addLearningPath(learningPathInfo : any) {
    return this.http.post<any>(this.fullApiHostV2 + "/learningpaths", learningPathInfo, this.httpOptions);
  }

  getLearningPathsAsStudent() {
    return this.http.get<any>(this.fullApiHostV2 + "/learningpaths?role=student", this.httpOptions);
  }


  getLearningPathWithMarks(learningPathId : any) {
    return this.http.get<any>(this.fullApiHostV2 + "/learningpaths/" + learningPathId + "/marks", this.httpOptions);
  }

  getLearningPath(learningPathId : any) {
    return this.http.get<any>(this.fullApiHostV2 + "/learningpaths/" + learningPathId , this.httpOptions);
  }

  updateLearningPath(learningPathId : any, learningPathInfo : any) {
    return this.http.put<any>(this.fullApiHostV2 + "/learningpaths/" + learningPathId, learningPathInfo, this.httpOptions);
  }

  deleteLearningPath(learningPathId : any) {
    return this.http.delete<any>(this.fullApiHostV2 + "/learningpaths/" + learningPathId , this.httpOptions);
  }

  addTeacherToLearningPath(learningPathId : any, info : any) {
    return this.http.post<any>(this.fullApiHostV2 + "/learningpaths/" + learningPathId + "/teachers", info, this.httpOptions);
  }

  removeTeacherFromLearningPath(learningPathId : any, profeId : any) {
    return this.http.delete<any>(this.fullApiHostV2 + "/learningpaths/" + learningPathId + "/teachers/" + profeId, this.httpOptions);
  }

  addStudentToLearningPath(learningPathId : any, info : any) {
    return this.http.post<any>(this.fullApiHostV2 + "/learningpaths/" + learningPathId + "/students", info, this.httpOptions);
  }

  removeStudentFromLearningPath(learningPathId : any, profeId : any) {
    return this.http.delete<any>(this.fullApiHostV2 + "/learningpaths/" + learningPathId + "/students/" + profeId, this.httpOptions);
  }

  addStandardToLearningPath(learningPathId : any, standardId : any) {
    let info = {standardId : standardId}
    return this.http.post<any>(this.fullApiHostV2 + "/learningpaths/" + learningPathId + "/standards", info, this.httpOptions);
  }

  removeStandardFromLearningPath(learningPathId : any, standardId : any) {
    return this.http.delete<any>(this.fullApiHostV2 + "/learningpaths/" + learningPathId + "/standards/" + standardId, this.httpOptions);
  }

  newRealization(activityId : any, info : any) {
    return this.http.post<any>(this.fullApiHost + "/projects/activities/"+activityId+"/realizations", info ,this.httpOptions);
  }

  updateRealization(activityId : any, realizationId : any, info : any) {
    return this.http.put<any>(this.fullApiHost + "/projects/activities/"+activityId+"/realizations/"+realizationId, info ,this.httpOptions);
  }

}