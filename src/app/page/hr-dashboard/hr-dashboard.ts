import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
interface MetricCard {
  label: string;
  value: number | string;
  badge: string;
  iconBg: string;
  iconColor: string;
  iconSvg: string;
  badgeBg: string;
  badgeColor: string;
}
 
interface Vacancy {
  title: string;
  initials: string;
  applications: number;
  iconBg: string;
  iconColor: string;
}
 
export type CandidateHRStatus = 'Hired' | 'Shortlisted' | 'Applied' | 'Rejected';
 
export interface HRCandidate {
  id: number;
  name: string;
  role: string;
  aiScore: number;
  status: CandidateHRStatus;
  avatar: string;
}
@Component({
  selector: 'app-hr-dashboard',
  imports: [],
  templateUrl: './hr-dashboard.html',
  styleUrl: './hr-dashboard.css',
})
export class HrDashboard implements OnInit{

  currentUser = { firstName: 'Sarah' };
  aiInsight    = { newMatches: 3 };
  chartView: 'monthly' | 'weekly' = 'monthly';
  candidateSearch = '';
  currentPage  = 1;
  pageSize     = 5;
 
  pipelineLabels = ['Applied', 'CV Reviewed', 'Shortlisted', 'Interview Pending', 'Hired'];
 
  // ── Metric Cards ──────────────────────────────────────
  metricCards: MetricCard[] = [
    {
      label: 'Total Candidates', value: 10, badge: '+12%',
      iconBg: '#eff6ff', iconColor: '#2563eb',
      badgeBg: '#f0fdf4', badgeColor: '#16a34a',
      iconSvg: `<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>`
    },
    {
      label: 'AI Interviews', value: 3, badge: 'Live Now',
      iconBg: '#f5f3ff', iconColor: '#7c3aed',
      badgeBg: '#f5f3ff', badgeColor: '#7c3aed',
      iconSvg: `<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>`
    },
    {
      label: 'Shortlisted', value: 3, badge: 'Top 5%',
      iconBg: '#fffbeb', iconColor: '#d97706',
      badgeBg: '#fffbeb', badgeColor: '#d97706',
      iconSvg: `<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
      </svg>`
    },
    {
      label: 'Scheduled', value: 4, badge: 'Next 48h',
      iconBg: '#eef2ff', iconColor: '#4f46e5',
      badgeBg: 'transparent', badgeColor: '#9ca3af',
      iconSvg: `<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
      </svg>`
    }
  ];
 
  // ── Vacancies ─────────────────────────────────────────
  vacancies: Vacancy[] = [
    { title: 'Intern',             initials: 'IN', applications: 3, iconBg: '#e0f2fe', iconColor: '#0369a1' },
    { title: 'Associate Engineer', initials: 'AS', applications: 3, iconBg: '#ede9fe', iconColor: '#6d28d9' },
    { title: 'Software Engineer',  initials: 'SE', applications: 7, iconBg: '#dbeafe', iconColor: '#1d4ed8' }
  ];
 
  // ── Candidates ────────────────────────────────────────
  allCandidates: HRCandidate[] = [
    {
      id: 1, name: 'Marcus Chen', role: 'Software Engineer', aiScore: 92, status: 'Hired',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBu8bzti2E_BrQ93cOxx0KLtfzY10Rk6dsSUM1rq1_oamx-7iOGEbyYheS_yEPrfgWGJbUGhXiD5IatwpvjB1wqZZIxnOOFCXgadpAHqF6UJN1SLChHdI_ZoGKzl51MhWk3FkFOIXKtzg6fTnkAiRPX3m_Gj5p1UDd2ux10vkNERLUPP-JXvfstEfWQ4IE6nTirwDfUGu-vjkcsYcxI7pjBP1qxKq235mhFsRiE1eodq2ABkJ19tR5X72tOmN2JyLGk-CiTSwm02eY'
    },
    {
      id: 2, name: 'Elena Rodriguez', role: 'Product Designer', aiScore: 85, status: 'Shortlisted',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0_1vs-nGsOq6X7Dqn5_noYPo9khjchiPV9rU2CmaqWrU90LQ564l7xzgUp6w25nP9KvLJQ8VEw8dND2X57uxelCmF5tzWFgEjNCXNUBGcYW73QVL0cLhW9G4G7isB7_GY-MPCBLcD9XTVvRayvoPazh9NPUBDQwdILCOqLZV6nDcz9bJKT1zgq88r0Li9678_60DQt88mi_28ug_TogQUU5JotYeo-UqG-p8tNJhrYii3Aiwcq393wpofof34bh3pDaPaQbex87Y'
    },
    {
      id: 3, name: 'James Wilson', role: 'Associate Engineer', aiScore: 68, status: 'Applied',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOjnM5tcGNDqOxCRooUvYvAY1BNkj1PY1_g07QD_57tNXI1BmOTscsjTd6t0wT_iIDdTSP_g6MhNmNcZK1rrtnVuMYmpBgXkChy7_P3OkpeJLIGv0nMWfOPB_ig5ZpO59tGM9PWa_CGlo7tolE3-7eNrV_33kRtq-HBa6VuolBQN9GdkwIRmi8vxbWCpJU2CN5gfvspQ4cJyKlZYGy07LusAj1eYbEZTVAnY48Doi6QC4kMlIpTevLXnuCKBTupZxWuVsb5nEO1ac'
    },
    {
      id: 4, name: 'Priya Nair', role: 'Data Scientist', aiScore: 78, status: 'Shortlisted',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBu8bzti2E_BrQ93cOxx0KLtfzY10Rk6dsSUM1rq1_oamx-7iOGEbyYheS_yEPrfgWGJbUGhXiD5IatwpvjB1wqZZIxnOOFCXgadpAHqF6UJN1SLChHdI_ZoGKzl51MhWk3FkFOIXKtzg6fTnkAiRPX3m_Gj5p1UDd2ux10vkNERLUPP-JXvfstEfWQ4IE6nTirwDfUGu-vjkcsYcxI7pjBP1qxKq235mhFsRiE1eodq2ABkJ19tR5X72tOmN2JyLGk-CiTSwm02eY'
    },
    {
      id: 5, name: 'Liam Fischer', role: 'DevOps Engineer', aiScore: 55, status: 'Rejected',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOjnM5tcGNDqOxCRooUvYvAY1BNkj1PY1_g07QD_57tNXI1BmOTscsjTd6t0wT_iIDdTSP_g6MhNmNcZK1rrtnVuMYmpBgXkChy7_P3OkpeJLIGv0nMWfOPB_ig5ZpO59tGM9PWa_CGlo7tolE3-7eNrV_33kRtq-HBa6VuolBQN9GdkwIRmi8vxbWCpJU2CN5gfvspQ4cJyKlZYGy07LusAj1eYbEZTVAnY48Doi6QC4kMlIpTevLXnuCKBTupZxWuVsb5nEO1ac'
    }
  ];
 
  // ── Computed ──────────────────────────────────────────
  get filteredCandidates(): HRCandidate[] {
    const q = this.candidateSearch.toLowerCase().trim();
    if (!q) return this.allCandidates;
    return this.allCandidates.filter(c => c.name.toLowerCase().includes(q));
  }
 
  get pagedCandidates(): HRCandidate[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCandidates.slice(start, start + this.pageSize);
  }
 
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredCandidates.length / this.pageSize));
  }
 
  get visiblePages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
 
  // ── Lifecycle ─────────────────────────────────────────
  constructor(private router: Router) {}
  ngOnInit(): void {}
 
  // ── Handlers ──────────────────────────────────────────
  onExportData(): void    { console.log('Export data'); }
  onVacancyMore(): void   { console.log('Vacancy more options'); }
  onFilter(): void        { console.log('Open filter panel'); }
 
  onVacancyClick(v: Vacancy): void {
    this.router.navigate(['/admin/vacancy'], { queryParams: { title: v.title } });
  }
 
  onViewCandidate(c: HRCandidate): void {
    this.router.navigate(['/admin/candidates', c.id]);
  }
 
  onCandidateSearch(): void { this.currentPage = 1; }
 
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }
 
  // ── Helpers ───────────────────────────────────────────
  getScoreClass(score: number): string {
    if (score >= 80) return 'score--high';
    if (score >= 60) return 'score--mid';
    return 'score--low';
  }
  
}
