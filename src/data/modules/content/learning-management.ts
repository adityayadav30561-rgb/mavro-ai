import type { ModuleContent } from '../schema';

/*
 * Learning Management. Source: product deck v2, slide 92 (tagline, four tiles: course catalogue, curriculum builder,
 * assessment, certification; six points on why it matters; four screens). Figures on the tiles come from the
 * module's screens (prototype/modules/learning-management/), whose scenario is below; like all screen data they are
 * illustrative.
 */
export const content: ModuleContent<'learning-management'> = {
  slug: 'learning-management',
  tagline: 'Training matrix to certificate: capability evidenced for the audit and for the job.',
  tiles: [
    {
      icon: 'layers',
      title: 'Course catalogue',
      body: 'Mandatory and optional courses by function.',
      figure: { value: '64', label: 'courses, 28 of them mandatory' },
    },
    {
      icon: 'workflow',
      title: 'Curriculum builder',
      body: 'Modules mapped to each role’s training matrix.',
      figure: { value: '42', label: 'role curricula' },
    },
    {
      icon: 'rules',
      title: 'Assessment',
      body: 'Pass marks, on-job evaluation and retraining cycles.',
      figure: { value: '80%', label: 'pass mark, plus an observed set-up' },
    },
    {
      icon: 'shield',
      title: 'Certification',
      body: 'Certificates issued with the evidence pack attached.',
      figure: { value: '94.2%', label: 'of mandatory training current' },
    },
  ],
  what: 'Capability building where training is a requirement: a course catalogue by function, curricula built from each role’s training matrix with sign-off by a subject-matter expert, assessments and on-job evaluation with defined pass marks and retraining cycles, and certification with the evidence pack an inspection expects. Training status is shared with deployment, so someone whose certificate has lapsed is not scheduled on that duty.',
  why: [
    'Training is mapped to the training matrix of every covered role.',
    'Overdue re-certification is visible before it blocks a line or a field call.',
    'Curricula release only with a qualified trainer and expert sign-off on file.',
    'On-job evaluation, not just a quiz score, decides who is certified.',
    'Certificates carry the evidence pack an auditor will ask to see.',
    'Learning status feeds rostering, so untrained staff are not scheduled.',
  ],
  flow: {
    from: [
      { slug: 'hrms-and-payroll', passes: 'Employees, roles and joiners' },
      { slug: 'audit-management', passes: 'Findings and CAPAs that call for training' },
      { slug: 'production-management', passes: 'Work centres that need certified people' },
    ],
    to: [
      { slug: 'roster-ledger', passes: 'Who is certified for which duty' },
      { slug: 'audit-management', passes: 'Training evidence for audits' },
      { slug: 'hrms-and-payroll', passes: 'Training history on the employee record' },
      { slug: 'document-management', passes: 'Certificates and evidence packs' },
    ],
  },
  industries: [
    { slug: 'manufacturing', note: 'Setters, operators and inspectors certified on the machines they run, with lapses visible to the roster.' },
    { slug: 'pharma', note: 'GMP and procedure training matrices with evidence for every inspection.' },
    { slug: 'distribution', note: 'Forklift, safety and hazard training for depot staff, renewed on time.' },
    { slug: 'service-providers', note: 'Compliance and skills training tracked per role and delivery team.' },
  ],
  roles: [
    { name: 'Training manager', task: 'Runs the catalogue, assignments and the certification queue.', works: 'LMS dashboard' },
    { name: 'Trainers', task: 'Teach, assess and sign the on-job evaluations.', works: 'Certification approvals' },
    { name: 'Subject-matter experts', task: 'Sign off curricula before they are released.', works: 'Curriculum builder' },
    { name: 'Supervisors', task: 'Evaluate people on the job and see who is certified.', works: 'Certification approvals' },
    { name: 'QA head', task: 'Raises training from audit findings and CAPAs.', works: 'Courses and curricula' },
  ],
  related: ['hrms-and-payroll', 'roster-ledger', 'audit-management', 'production-management'],
  screens: [
    {
      screen: 'learning-management/lms-dashboard',
      view: 'LMS dashboard',
      title: 'Training and certification dashboard',
      caption: 'Mandatory training current by department, certifications expiring, overdue people and new courses.',
      alt: 'MAVRO learning dashboard: 94.2% of mandatory training current, 23 re-certifications due in 30 days, 4 overdue and kept off duty, 41 certificates issued, status by department, certifications expiring by month, the overdue people and a new mandatory course raised from an audit finding (illustrative data).',
    },
    {
      screen: 'learning-management/certification-approvals',
      view: 'Certification approvals',
      title: 'Certification approvals',
      caption: 'Certificates wait for their evidence pack: assessment, on-job evaluation, trainer and attendance.',
      alt: 'MAVRO certification approval queue: seven certificates with evidence progress, and one re-certification for a 5-axis setter held until the on-job evaluation is signed despite a passing written test, with trainer qualification and attendance on record (illustrative data).',
    },
    {
      screen: 'learning-management/course-register',
      view: 'Courses and curricula',
      title: 'Courses and curricula',
      caption: 'The catalogue by function with type, delivery, hours, pass mark, validity and trainer.',
      alt: 'MAVRO course register: mandatory and optional courses with function, delivery, hours, pass mark, certificate validity, trainer and state, including a new course published that day and one waiting for expert sign-off (illustrative data).',
    },
    {
      screen: 'learning-management/curriculum-builder',
      view: 'Curriculum builder',
      title: 'Curriculum builder',
      caption: 'A role curriculum as modules, its assessment rules and the gates before release.',
      alt: 'MAVRO curriculum builder for a 5-axis setter: five modules totalling 14 hours with one added in the new revision, assessment rules with a pass mark and a 12-point on-job checklist, release gates for trainer qualification and sign-offs, and the people in the role with certificate status (illustrative data).',
    },
  ],
  scenario:
    'Northfield Precision, 8 Oct, 14:02. 491 employees in 42 roles; 94.2% of mandatory training is current and 4 people are overdue, so they stay off that duty in Roster Ledger. Yogesh Dhumal passed the 5-axis written test with 86%, but his certificate is held until the supervisor signs the on-job evaluation on 10 Oct. CRS-0071 on calibrated tools was raised today from CAPA-0088 and assigned to 64 supervisors and assembly operators.',
  faq: [
    {
      q: 'What does Learning Management in MAVRO do?',
      a: 'MAVRO Learning Management keeps a course catalogue by function, builds curricula from each role’s training matrix, runs assessments and on-job evaluations with pass marks and retraining cycles, and issues certificates with an evidence pack attached.',
    },
    {
      q: 'Does a quiz score decide who is certified?',
      a: 'No. MAVRO can require an on-job evaluation by a qualified supervisor as well as a written assessment, so a certificate is issued only when every part of the evidence pack is complete.',
    },
    {
      q: 'How does training connect to rostering?',
      a: 'Learning status is shared with Roster Ledger and Production, so someone whose certificate has lapsed is not scheduled on that duty until they are re-certified.',
    },
    {
      q: 'Can training be raised from an audit finding?',
      a: 'Yes. A corrective action from an audit can create a mandatory course, signed off by an expert and assigned to the people it affects, with completion tracked against the CAPA.',
    },
  ],
  seo: {
    title: 'Training matrix and certification management software | MAVRO',
    description:
      'MAVRO Learning Management: course catalogue, curricula built from the role training matrix, assessments with on-job evaluation, certificates with evidence packs, and training status shared with rostering.',
  },
};
