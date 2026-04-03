import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
export type UserStatus = 'Active' | 'On Leave' | 'Inactive';
 
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  avatar?: string;
}
 
interface Filters {
  role: string;
  search: string;
}
 
interface UserForm {
  name: string;
  email: string;
  role: string;
  status: UserStatus;
}
@Component({
  selector: 'app-user-menegement',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-menegement.html',
  styleUrls: ['./user-menegement.css'],
})
export class UserMenegement {

  isLoading = false;
  showModal = false;
  editingUser: User | null = null;
 
  // ── Form Data ─────────────────────────────────────────
  formData: UserForm = {
    name: '', email: '', role: '', status: 'Active'
  };
 
  // ── All Users (mock — replace with service) ───────────
  allUsers: User[] = [
    {
      id: 'LUM-9821',
      name: 'Sarah Jenkins',
      email: 's.jenkins@lumina-ai.com',
      role: 'Senior AI Architect',
      status: 'Active',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa218X2EP3gKOowjKbIjTX0nVkaDB0ZRakm_hsW0IP_3IyMAEWLrO1Bz9ucCHdEIam09vHoAcGihV4g_ydf7Mflxw3YNZubZakEphpVnQVt0Qoj-TXIR3Eyzlqvib2iEsrAtAV_TV5DSykc7jHHgPwdVOaxHsejPTKrjQ0g2oD4bzav20qQX-mrQJ9dCJsR4wY0S09vq-V-J5MuomlT4NyfJifekbC5QpnJCsTuUz1nRKtDj8SfVZcZqimWsbnnP-Wiyeu3-ZPWzg'
    },
    {
      id: 'LUM-4432',
      name: 'Marcus Thorne',
      email: 'm.thorne@lumina-ai.com',
      role: 'Head of Ethics',
      status: 'On Leave',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1p-InD88BDfj13F581rZEM_9D_yoewAcaOmMOWtzHIzAavWo5TBj3qKyDh-TWKWL3M8PkEt1K7Tjwvx9owqO0s9IQbUktidm0NWDnFlt2A47sfwLp51bjNobAGNsmuDPRcjD06DoLL2AS_iTO4z7ngvOUM_NOsgFNTffp1UxuaJ2mDUD2C3XJc7S8Jt3XhRfe2zqcC9JvcC7fDSLOSGvidoNefnZ0KGzzpcuagcqvfoIOHqQIjZr-0YaCKUprPZ5A92uhlzuFDUQ'
    },
    {
      id: 'LUM-7710',
      name: 'Elena Rodriguez',
      email: 'e.rodriguez@lumina-ai.com',
      role: 'Lead Product Designer',
      status: 'Active',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbygLuhq50IZ29zKUtxTrepz8lbPY9PFledO3msrkZiNqs21bAx3I3lcKHEoSg-pg22CfME1cMt6jhSlvexaTGqUoPBDmBYU3DfX8he5o5nVgXJ8fWJCqNwzQV8oS1vgkCw8eyL-ywYYjELTPfurO4jB-INILJyljpArwv3K8csx0NW2caJkADlYuI-UOzkSw0g5rJ5MFon-NfLX7WLDvu0-V8QXIooyImJmMP0scbpRwpiFoS_jlCwLsWjOgwmOvVgne7DUIt2oQ'
    },
    {
      id: 'LUM-1102',
      name: 'David Kim',
      email: 'd.kim@lumina-ai.com',
      role: 'DevOps Specialist',
      status: 'Inactive',
      avatar: undefined
    },
    {
      id: 'LUM-3305',
      name: 'Anika Patel',
      email: 'a.patel@lumina-ai.com',
      role: 'Data Scientist',
      status: 'Active',
      avatar: undefined
    },
    {
      id: 'LUM-6621',
      name: 'James O\'Brien',
      email: 'j.obrien@lumina-ai.com',
      role: 'AI Engineer',
      status: 'Active',
      avatar: undefined
    }
  ];
 
  // ── Filters ───────────────────────────────────────────
  filters: Filters = { role: '', search: '' };
 
  // ── Pagination ────────────────────────────────────────
  currentPage = 1;
  pageSize = 10;
 
  // ── Role → color dot map ──────────────────────────────
  private roleColors: Record<string, string> = {
    'Senior AI Architect':  '#34b5fa',
    'Head of Ethics':       '#584cb5',
    'Lead Product Designer':'#005f9a',
    'DevOps Specialist':    '#9ca3af',
    'Data Scientist':       '#0d9488',
    'AI Engineer':          '#16a34a',
    'UX Architect':         '#d97706',
    'Project Manager':      '#dc2626'
  };
 
  // ── Lifecycle ─────────────────────────────────────────
  constructor(private router: Router) {}
 
  ngOnInit(): void {
    // Replace with service call:
    // this.userService.getAll().subscribe(users => this.allUsers = users);
  }
 
  // ── Computed: filtered list ───────────────────────────
  get filteredUsers(): User[] {
    let list = [...this.allUsers];
 
    if (this.filters.role) {
      list = list.filter(u =>
        u.role.toLowerCase().includes(this.filters.role.toLowerCase())
      );
    }
 
    if (this.filters.search.trim()) {
      const q = this.filters.search.trim().toLowerCase();
      list = list.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    }
 
    return list;
  }
 
  get pagedUsers(): User[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }
 
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredUsers.length / this.pageSize));
  }
 
  get paginationStart(): number {
    return Math.min((this.currentPage - 1) * this.pageSize + 1, this.filteredUsers.length || 1);
  }
 
  get paginationEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredUsers.length);
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
 
  // ── Handlers ──────────────────────────────────────────
  onFilterChange(): void {
    this.currentPage = 1;
  }
 
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }
 
  onViewUser(user: User): void {
    this.router.navigate(['/admin/users', user.id]);
  }
 
  onAddUser(): void {
    this.editingUser = null;
    this.formData = { name: '', email: '', role: '', status: 'Active' };
    this.showModal = true;
  }
 
  onEditUser(user: User): void {
    this.editingUser = user;
    this.formData = { name: user.name, email: user.email, role: user.role, status: user.status };
    this.showModal = true;
  }
 
  onMoreOptions(user: User): void {
    console.log('More options for:', user.name);
    // Open context menu / dropdown
  }
 
  onSaveUser(): void {
    if (!this.formData.name || !this.formData.email) return;
 
    if (this.editingUser) {
      const idx = this.allUsers.findIndex(u => u.id === this.editingUser!.id);
      if (idx > -1) {
        this.allUsers[idx] = { ...this.allUsers[idx], ...this.formData };
      }
    } else {
      const newUser: User = {
        id: `LUM-${Math.floor(1000 + Math.random() * 9000)}`,
        ...this.formData,
        avatar: undefined
      };
      this.allUsers = [newUser, ...this.allUsers];
    }
 
    this.closeModal();
  }
 
  closeModal(): void {
    this.showModal = false;
    this.editingUser = null;
  }
 
  // ── Helper ────────────────────────────────────────────
  getRoleColor(role: string): string {
    return this.roleColors[role] || '#9ca3af';
  }
}
