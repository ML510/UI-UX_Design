import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Filters {
  role: string;
  status: string;
  sort: 'highest' | 'lowest' | 'recent';
}

interface CandidateModel {
  id: number;
  name: string;
  location: string;
  role: string;
  experience: number;
  aiScore: number;
  humanScore: number;
  status: string;
  email: string;
  avatar: string;
  updatedAt: Date;
}

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidate.html',
  styleUrls: ['./candidate.css'],
})
export class Candidate implements OnInit {

   stats = {
    totalCandidates: 1284,
    openPositions: 24,
    aiAccuracy: 98.4
  };
 
  isLoading = false;
 
  // ── All Candidates (mock data — replace with service) ──
  allCandidates: CandidateModel[] = [
    {
      id: 1,
      name: 'Elena Rodriguez',
      location: 'San Francisco, CA',
      role: 'Senior Product Designer',
      experience: 8,
      aiScore: 94,
      humanScore: 88,
      status: 'Interviewed',
      email: 'elena.rod@design.co',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo8DMSX_r2Rvd55lTFpmEluKg1lOO0acR69FnK5Go2i_yXAW9ezWlcRYxI6vg7FU4t3hw92nMG425AC2A_pPvC4Ns7s6Kxw_imj1LFW-b41HZt2-iai1WhdP984JB_8oBqqxIAtpEG5BuZ8e96Hdp2Z3kP65hvtyEzXhm0fVlp59GURiC7SK7be-nX_jcjV5w0-AIv8gyJ5UVtV6ZYUECGROowlQwD6nDWpVqcrSwVVdDZl_pcgSqsz2xaAAPCYjoAEkFvOAV3pjo',
      updatedAt: new Date('2026-04-01')
    },
    {
      id: 2,
      name: 'Marcus Chen',
      location: 'Austin, TX',
      role: 'Fullstack Engineer',
      experience: 5,
      aiScore: 91,
      humanScore: 92,
      status: 'Pending',
      email: 'm.chen@dev.io',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzZCDtBbf2Je6lEnAzUDVqYg10SkzGdb-02Es-EWnT_ZgsF5FG1zsr_QrPzWlYvrvt56XVa7gqiOCj3u7mcuN-fpe08h9UhOWQcq9YHmXWGm-DLizjBw-EL8dhv_P35VFWw3uxYauq2qe_wJ8mVdgE1qDagMxYHgT1d0jW3MNx-zUMgRCGP4vtMdW_MsqZW4ps1Ggp-f_SjRVLi5u-CWYyw1mlC8bSJS0gvc0ZjoIjlKC0XdNT8MxzcIVAU--3JcdWFHaB4U9JoaA',
      updatedAt: new Date('2026-03-31')
    },
    {
      id: 3,
      name: 'Sarah Jenkins',
      location: 'Seattle, WA',
      role: 'Product Manager',
      experience: 12,
      aiScore: 89,
      humanScore: 95,
      status: 'Interviewed',
      email: 's.jenkins@corp.com',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVIOev6kTRe3GgtuFTCiVbOn4ZSIaVZcaPL5WLy789VYFosblInFE1NMtCUkcgRCEOauV9-m9FXui_y8rSNNkQkbu9RvZ4RXLKRFsmgfwgf91K1Fz6j3RtoksbEYxAJ2sI6IT6QT_BsPgHi3LvXO7LK-K9fKQAez7LETL2nrLdDgfgRkTsyDSTgUKJ3-rGut0nbGyIDMPKXNa6e10iwXBcV89IFCTecuGw4pS6uFXDKJcfh9Ep3XY5kMcJ02N1WTW15ESDEC1zbmQ',
      updatedAt: new Date('2026-03-30')
    },
    {
      id: 4,
      name: 'Jordan Smyth',
      location: 'London, UK',
      role: 'UI Engineer',
      experience: 3,
      aiScore: 74,
      humanScore: 65,
      status: 'Rejected',
      email: 'j.smyth@freelance.uk',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV_tCrum7r_doPjaVySbGylyJv4uis2O9PTNjjEN83Ku0xmihgLo3LKZBXKIswdrkuIcm0ELz-ND87aIK2lXt2QSJ5V2mNgGyELwLH6TIVBlZ53-1duCxVe978wKzSwByPJU_HxveRetvNsGELq8__tJDIUlhGnKUhZD2JC9hXmguc9paAnmccu37o_lVVMoRn88yUj26a_fP8z0z6PIJW30Tvw_pTZ3K8jpBP5ubKOVO3LzRmONniZYwYvLjM1zpN6JZRRdv18dQ',
      updatedAt: new Date('2026-03-28')
    },
    {
      id: 5,
      name: 'Priya Nair',
      location: 'Mumbai, IN',
      role: 'Data Scientist',
      experience: 6,
      aiScore: 96,
      humanScore: 91,
      status: 'Sourced',
      email: 'p.nair@datahub.in',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo8DMSX_r2Rvd55lTFpmEluKg1lOO0acR69FnK5Go2i_yXAW9ezWlcRYxI6vg7FU4t3hw92nMG425AC2A_pPvC4Ns7s6Kxw_imj1LFW-b41HZt2-iai1WhdP984JB_8oBqqxIAtpEG5BuZ8e96Hdp2Z3kP65hvtyEzXhm0fVlp59GURiC7SK7be-nX_jcjV5w0-AIv8gyJ5UVtV6ZYUECGROowlQwD6nDWpVqcrSwVVdDZl_pcgSqsz2xaAAPCYjoAEkFvOAV3pjo',
      updatedAt: new Date('2026-04-02')
    },
    {
      id: 6,
      name: 'Liam Fischer',
      location: 'Berlin, DE',
      role: 'Software Engineer',
      experience: 7,
      aiScore: 87,
      humanScore: 83,
      status: 'Pending',
      email: 'l.fischer@techde.com',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzZCDtBbf2Je6lEnAzUDVqYg10SkzGdb-02Es-EWnT_ZgsF5FG1zsr_QrPzWlYvrvt56XVa7gqiOCj3u7mcuN-fpe08h9UhOWQcq9YHmXWGm-DLizjBw-EL8dhv_P35VFWw3uxYauq2qe_wJ8mVdgE1qDagMxYHgT1d0jW3MNx-zUMgRCGP4vtMdW_MsqZW4ps1Ggp-f_SjRVLi5u-CWYyw1mlC8bSJS0gvc0ZjoIjlKC0XdNT8MxzcIVAU--3JcdWFHaB4U9JoaA',
      updatedAt: new Date('2026-03-29')
    }
  ];
 
  // ── Filters ───────────────────────────────────────────
  filters: Filters = {
    role: '',
    status: '',
    sort: 'highest'
  };
 
  // ── Pagination ────────────────────────────────────────
  currentPage = 1;
  pageSize = 10;
 
  // ── Computed: filtered list ───────────────────────────
  get filteredCandidates(): CandidateModel[] {
    let list = [...this.allCandidates];
 
    if (this.filters.role) {
      list = list.filter(c =>
        c.role.toLowerCase().includes(this.filters.role.toLowerCase())
      );
    }
 
    if (this.filters.status) {
      list = list.filter(c => c.status === this.filters.status);
    }
 
    switch (this.filters.sort) {
      case 'highest': list.sort((a, b) => b.aiScore - a.aiScore); break;
      case 'lowest':  list.sort((a, b) => a.aiScore - b.aiScore); break;
      case 'recent':  list.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()); break;
    }
 
    return list;
  }
 
  get pagedCandidates(): CandidateModel[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCandidates.slice(start, start + this.pageSize);
  }
 
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredCandidates.length / this.pageSize));
  }
 
  get paginationStart(): number {
    return Math.min(
      (this.currentPage - 1) * this.pageSize + 1,
      this.filteredCandidates.length || 1
    );
  }
 
  get paginationEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredCandidates.length);
  }
 
  get visiblePages(): (number | string)[] {
    const total = this.totalPages;
    const cur = this.currentPage;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
 
    const pages: (number | string)[] = [1];
    if (cur > 3) pages.push('...');
    for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) pages.push(i);
    if (cur < total - 2) pages.push('...');
    pages.push(total);
    return pages;
  }
 
  // ── Lifecycle ─────────────────────────────────────────
  constructor(private router: Router) {}
 
  ngOnInit(): void {
    // Replace with service: this.candidateService.getAll().subscribe(...)
  }
 
  // ── Handlers ──────────────────────────────────────────
  onFilterChange(): void {
    this.currentPage = 1;
  }
 
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
 
  onViewCandidate(candidate: CandidateModel): void {
    this.router.navigate(['/admin/candidates', candidate.id]);
  }
 
  onMoreOptions(candidate: CandidateModel): void {
    console.log('More options for:', candidate.name);
    // Open dropdown / context menu
  }
 
  onSourceTalent(): void {
    this.router.navigate(['/admin/vacancy/source']);
  }
 
  onOpenAssistant(): void {
    console.log('Open AI Assistant');
    // Open AI chat panel
  }
 
  // ── Helpers ───────────────────────────────────────────
  getScoreClass(score: number): string {
    if (score >= 90) return 'score--high';
    if (score >= 75) return 'score--mid';
    return 'score--low';
  }
}
