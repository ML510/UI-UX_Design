import { Component, OnInit } from '@angular/core';
 
export type SlotStatus = 'Scheduled' | 'Completed' | 'Pending' | 'Cancelled';
 
export interface InterviewSlot {
  id: number;
  date: string;          // ISO: YYYY-MM-DD
  startTime: string;     // HH:MM
  endTime: string;       // HH:MM
  interviewerId: string;
  interviewerName: string;
  status: SlotStatus;
}
 
export interface Interviewer {
  id: string;
  name: string;
}
 
interface SlotForm {
  date: string;
  startTime: string;
  endTime: string;
  interviewerId: string;
  status: SlotStatus;
}
@Component({
  selector: 'app-interviewer-slot',
  imports: [],
  templateUrl: './interviewer-slot.html',
  styleUrl: './interviewer-slot.css',
})
export class InterviewerSlot implements OnInit{

  isLoading = false;
  showDeleteConfirm = false;
  slotToDelete: InterviewSlot | null = null;
  editingSlot: InterviewSlot | null = null;

  
 
  // ── Interviewers ──────────────────────────────────────
  interviewers: Interviewer[] = [
    { id: 'INT-8829', name: 'Dr. Sarah Chen' },
    { id: 'INT-9011', name: 'James Wilson' },
    { id: 'INT-7723', name: 'Elena Rodriguez' },
    { id: 'INT-6604', name: 'Michael Park' }
  ];
 
  // ── Form ──────────────────────────────────────────────
  formData: SlotForm = {
    date: '', startTime: '', endTime: '', interviewerId: '', status: 'Scheduled'
  };
 
  // ── Slots (mock data — replace with service) ──────────
  allSlots: InterviewSlot[] = [
    {
      id: 1, date: '2024-05-12', startTime: '09:30 AM', endTime: '10:15 AM',
      interviewerId: 'INT-8829', interviewerName: 'Dr. Sarah Chen', status: 'Scheduled'
    },
    {
      id: 2, date: '2024-05-12', startTime: '11:00 AM', endTime: '11:45 AM',
      interviewerId: 'INT-9011', interviewerName: 'James Wilson', status: 'Completed'
    },
    {
      id: 3, date: '2024-05-14', startTime: '02:00 PM', endTime: '02:45 PM',
      interviewerId: 'INT-7723', interviewerName: 'Elena Rodriguez', status: 'Pending'
    },
    {
      id: 4, date: '2024-05-15', startTime: '10:00 AM', endTime: '10:45 AM',
      interviewerId: 'INT-8829', interviewerName: 'Dr. Sarah Chen', status: 'Scheduled'
    },
    {
      id: 5, date: '2024-05-16', startTime: '03:00 PM', endTime: '03:45 PM',
      interviewerId: 'INT-6604', interviewerName: 'Michael Park', status: 'Pending'
    }
  ];
 
  // ── Filter & Pagination ───────────────────────────────
  filterStatus = '';
  currentPage = 1;
  pageSize = 4;
  private nextId = 100;
 
  // ── Lifecycle ─────────────────────────────────────────
  ngOnInit(): void {
    // this.scheduleService.getAll().subscribe(slots => this.allSlots = slots);
  }
 
  // ── Computed ──────────────────────────────────────────
  get filteredSlots(): InterviewSlot[] {
    if (!this.filterStatus) return this.allSlots;
    return this.allSlots.filter(s => s.status === this.filterStatus);
  }
 
  get pagedSlots(): InterviewSlot[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredSlots.slice(start, start + this.pageSize);
  }
 
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredSlots.length / this.pageSize));
  }
 
  get paginationStart(): number {
    return Math.min((this.currentPage - 1) * this.pageSize + 1, this.filteredSlots.length || 1);
  }
 
  get paginationEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredSlots.length);
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
  onFilterChange(): void { this.currentPage = 1; }
 
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }
 
  onSubmitSlot(): void {
    if (!this.formData.date || !this.formData.startTime || !this.formData.endTime || !this.formData.interviewerId) return;
 
    const interviewer = this.interviewers.find(iv => iv.id === this.formData.interviewerId);
    const name = interviewer ? interviewer.name : this.formData.interviewerId;
 
    if (this.editingSlot) {
      const idx = this.allSlots.findIndex(s => s.id === this.editingSlot!.id);
      if (idx > -1) {
        this.allSlots[idx] = {
          ...this.allSlots[idx],
          ...this.formData,
          interviewerName: name
        };
      }
      this.editingSlot = null;
    } else {
      const newSlot: InterviewSlot = {
        id: this.nextId++,
        date: this.formData.date,
        startTime: this.formData.startTime,
        endTime: this.formData.endTime,
        interviewerId: this.formData.interviewerId,
        interviewerName: name,
        status: 'Scheduled'
      };
      this.allSlots = [newSlot, ...this.allSlots];
    }
 
    this.resetForm();
  }
 
  onEditSlot(slot: InterviewSlot): void {
    this.editingSlot = slot;
    this.formData = {
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      interviewerId: slot.interviewerId,
      status: slot.status
    };
    // Scroll to form on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
 
  onCancelEdit(): void {
    this.editingSlot = null;
    this.resetForm();
  }
 
  onDeleteSlot(slot: InterviewSlot): void {
    this.slotToDelete = slot;
    this.showDeleteConfirm = true;
  }
 
  confirmDelete(): void {
    if (this.slotToDelete) {
      this.allSlots = this.allSlots.filter(s => s.id !== this.slotToDelete!.id);
    }
    this.showDeleteConfirm = false;
    this.slotToDelete = null;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }
 
  onTableMore(): void {
    console.log('Table more options');
  }
 
  // ── Helpers ───────────────────────────────────────────
  countByStatus(status: SlotStatus): number {
    return this.allSlots.filter(s => s.status === status).length;
  }
 
  formatDate(iso: string): string {
    if (!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
 
  private resetForm(): void {
    this.formData = { date: '', startTime: '', endTime: '', interviewerId: '', status: 'Scheduled' };
  }
}
