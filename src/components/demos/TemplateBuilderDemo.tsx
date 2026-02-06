import React, { useState, useCallback, useRef } from 'react';
import { DemoHeader } from './DemoHeader';
import { DemoTour, useDemoTour } from './DemoTour';
import { TourButton } from './TourButton';
import { 
  Type, 
  FileText, 
  Hash, 
  Calendar, 
  List, 
  CheckSquare, 
  Radio, 
  Upload, 
  PenTool,
  GripVertical,
  Trash2,
  Plus,
  Eye,
  ArrowUp,
  ArrowDown,
  Copy,
  Clipboard,
  Undo2,
  Redo2,
  X,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

// Types matching the actual app
type FieldType = 'text' | 'textarea' | 'number' | 'date' | 'select' | 'multiselect' | 'checkbox' | 'radio' | 'toggle' | 'file' | 'signature' | 'repeater';

interface Element {
  id: string;
  type: FieldType;
  label: string;
  key: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: any }[];
  props?: Record<string, any>;
}

interface Row {
  id: string;
  columns: Column[];
}

interface Column {
  id: string;
  width: number;
  elements: Element[];
}

interface Section {
  id: string;
  title: string;
  rows: Row[];
}

interface TemplateSchema {
  meta: {
    name: string;
    description?: string;
  };
  sections: Section[];
}

interface Selection {
  selectedSectionId?: string;
  selectedRowId?: string;
  selectedColumnId?: string;
  selectedElementId?: string;
}

interface HistoryState {
  schema: TemplateSchema;
  selection: Selection;
}

const FIELD_TYPES: { type: FieldType; label: string; icon: any }[] = [
  { type: 'text', label: 'Text', icon: Type },
  { type: 'textarea', label: 'Textarea', icon: FileText },
  { type: 'number', label: 'Number', icon: Hash },
  { type: 'date', label: 'Date', icon: Calendar },
  { type: 'select', label: 'Select', icon: List },
  { type: 'multiselect', label: 'Multi Select', icon: List },
  { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
  { type: 'radio', label: 'Radio', icon: Radio },
  { type: 'toggle', label: 'Toggle', icon: CheckSquare },
  { type: 'file', label: 'File Upload', icon: Upload },
  { type: 'signature', label: 'Signature', icon: PenTool },
  { type: 'repeater', label: 'Repeater/Table', icon: List },
];

// Breadcrumbs Component
const Breadcrumbs: React.FC<{ selection: Selection; onNavigate: (type: string, id: string) => void }> = ({ selection, onNavigate }) => {
  const parts: { label: string; id: string; type: string }[] = [];
  
  if (selection.selectedSectionId) {
    parts.push({ label: 'Section', id: selection.selectedSectionId, type: 'section' });
  }
  if (selection.selectedRowId) {
    parts.push({ label: 'Row', id: selection.selectedRowId, type: 'row' });
  }
  if (selection.selectedColumnId) {
    parts.push({ label: 'Column', id: selection.selectedColumnId, type: 'column' });
  }
  if (selection.selectedElementId) {
    parts.push({ label: 'Element', id: selection.selectedElementId, type: 'element' });
  }

  if (parts.length === 0) {
    return <span className="text-xs text-slate-400">No selection</span>;
  }

  return (
    <div className="flex items-center gap-1 text-xs">
      {parts.map((part, idx) => (
        <React.Fragment key={part.id}>
          {idx > 0 && <span className="text-slate-400 mx-1">›</span>}
          <button
            onClick={() => onNavigate(part.type, part.id)}
            className="text-slate-700 font-semibold hover:text-blue-600"
          >
            {part.label}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

// Toast Component
const Toast: React.FC<{ message: string; onUndo?: () => void; onDismiss: () => void }> = ({ message, onUndo, onDismiss }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-white border border-slate-200 rounded-lg shadow-lg p-3 flex items-center gap-3 z-50 min-w-[300px]">
      <span className="text-sm text-slate-700 flex-1">{message}</span>
      {onUndo && (
        <button
          onClick={onUndo}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          Undo
        </button>
      )}
      <button
        onClick={onDismiss}
        className="text-slate-400 hover:text-slate-600"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const SAMPLE_TEMPLATES: TemplateSchema[] = [
  {
    meta: {
      name: 'Risk Assessment Form',
      description: 'Comprehensive risk assessment template'
    },
    sections: [
      {
        id: 'section-1',
        title: 'Personal Information',
        rows: [
          {
            id: 'row-1',
            columns: [
              {
                id: 'col-1',
                width: 6,
                elements: [
                  { id: 'elem-1', type: 'text', label: 'First Name', key: 'first_name', placeholder: 'Enter first name', required: true },
                  { id: 'elem-2', type: 'text', label: 'Last Name', key: 'last_name', placeholder: 'Enter last name', required: true }
                ]
              },
              {
                id: 'col-2',
                width: 6,
                elements: [
                  { id: 'elem-3', type: 'date', label: 'Date of Birth', key: 'dob', required: true },
                  { id: 'elem-4', type: 'text', label: 'NHS Number', key: 'nhs_number', placeholder: 'Enter NHS number' }
                ]
              }
            ]
          },
          {
            id: 'row-2',
            columns: [
              {
                id: 'col-3',
                width: 12,
                elements: [
                  { id: 'elem-5', type: 'textarea', label: 'Address', key: 'address', placeholder: 'Enter full address' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'section-2',
        title: 'Risk Assessment',
        rows: [
          {
            id: 'row-3',
            columns: [
              {
                id: 'col-4',
                width: 12,
                elements: [
                  { id: 'elem-6', type: 'select', label: 'Risk Level', key: 'risk_level', options: [
                    { label: 'Low', value: 'low' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'High', value: 'high' },
                    { label: 'Critical', value: 'critical' }
                  ], required: true },
                  { id: 'elem-7', type: 'textarea', label: 'Risk Description', key: 'risk_description', placeholder: 'Describe the identified risks' },
                  { id: 'elem-8', type: 'checkbox', label: 'Requires Immediate Action', key: 'immediate_action', required: false }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    meta: {
      name: 'Initial Assessment',
      description: 'Standard client admission form'
    },
    sections: [
      {
        id: 'sect-ia-1',
        title: 'Client Details',
        rows: [
          {
            id: 'row-ia-1',
            columns: [
              {
                id: 'col-ia-1',
                width: 12,
                elements: [
                  { id: 'el-ia-1', type: 'text', label: 'Full Name', key: 'full_name', required: true },
                  { id: 'el-ia-2', type: 'date', label: 'Date of Admission', key: 'admission_date', required: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'sect-ia-2',
        title: 'Health Status',
        rows: [
          {
            id: 'row-ia-2',
            columns: [
              {
                id: 'col-ia-2',
                width: 12,
                elements: [
                  { id: 'el-ia-3', type: 'select', label: 'Mobility Level', key: 'mobility', options: [{ label: 'Independent', value: 'independent' }, { label: 'Assisted', value: 'assisted' }, { label: 'Wheelchair', value: 'wheelchair' }] },
                  { id: 'el-ia-4', type: 'textarea', label: 'Medical History', key: 'medical_history', placeholder: 'List relevant medical history' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    meta: {
      name: 'Incident Report',
      description: 'Report for accidents and incidents'
    },
    sections: [
      {
        id: 'sect-ir-1',
        title: 'Incident Details',
        rows: [
          {
            id: 'row-ir-1',
            columns: [
              {
                id: 'col-ir-1',
                width: 6,
                elements: [
                  { id: 'el-ir-1', type: 'date', label: 'Date of Incident', key: 'incident_date', required: true },
                  { id: 'el-ir-2', type: 'text', label: 'Time', key: 'incident_time', required: true }
                ]
              },
              {
                id: 'col-ir-2',
                width: 6,
                elements: [
                  { id: 'el-ir-3', type: 'select', label: 'Severity', key: 'severity', options: [{ label: 'Low', value: 'low' }, { label: 'Medium', value: 'medium' }, { label: 'High', value: 'high' }, { label: 'Critical', value: 'critical' }], required: true }
                ]
              }
            ]
          },
          {
            id: 'row-ir-2',
            columns: [
              {
                id: 'col-ir-3',
                width: 12,
                elements: [
                  { id: 'el-ir-4', type: 'textarea', label: 'Description of Incident', key: 'description', required: true, placeholder: 'Describe what happened...' },
                  { id: 'el-ir-5', type: 'textarea', label: 'Immediate Action Taken', key: 'action_taken', required: true }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export const TemplateBuilderDemo: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  const [schema, setSchema] = useState<TemplateSchema>(SAMPLE_TEMPLATES[0]);
  const tour = useDemoTour('template-builder');

  const [selection, setSelection] = useState<Selection>({});
  const [history, setHistory] = useState<HistoryState[]>([{ schema, selection }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [clipboard, setClipboard] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; onUndo?: () => void } | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const selectedSection = schema.sections.find(s => s.id === selection.selectedSectionId);
  const selectedElement = selectedSection?.rows
    .flatMap(r => r.columns)
    .flatMap(c => c.elements)
    .find(e => e.id === selection.selectedElementId);

  const commit = useCallback((nextSchema: TemplateSchema, nextSelection: Selection = selection) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ schema: nextSchema, selection: nextSelection });
    setHistory(newHistory.slice(-50)); // Keep last 50 states
    setHistoryIndex(newHistory.length - 1);
    setSchema(nextSchema);
    setSelection(nextSelection);
  }, [history, historyIndex, selection]);

  const undo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setSchema(prevState.schema);
      setSelection(prevState.selection);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setSchema(nextState.schema);
      setSelection(nextState.selection);
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const addFieldToSelection = (fieldType: FieldType) => {
    const newSchema = JSON.parse(JSON.stringify(schema));
    
    if (selection.selectedColumnId) {
      for (const section of newSchema.sections) {
        for (const row of section.rows) {
          for (const column of row.columns) {
            if (column.id === selection.selectedColumnId) {
              const newElement: Element = {
                id: `elem-${Date.now()}`,
                type: fieldType,
                label: fieldType.charAt(0).toUpperCase() + fieldType.slice(1).replace(/([A-Z])/g, ' $1'),
                key: `${fieldType}_${Date.now()}`,
                placeholder: `Enter ${fieldType}`,
                required: false
              };
              column.elements.push(newElement);
              commit(newSchema, { ...selection, selectedElementId: newElement.id });
              return;
            }
          }
        }
      }
    } else if (selection.selectedSectionId) {
      const section = newSchema.sections.find((s: Section) => s.id === selection.selectedSectionId);
      if (section && section.rows.length > 0) {
        const lastRow = section.rows[section.rows.length - 1];
        if (lastRow.columns.length > 0) {
          const lastColumn = lastRow.columns[lastRow.columns.length - 1];
          const newElement: Element = {
            id: `elem-${Date.now()}`,
            type: fieldType,
            label: fieldType.charAt(0).toUpperCase() + fieldType.slice(1).replace(/([A-Z])/g, ' $1'),
            key: `${fieldType}_${Date.now()}`,
            placeholder: `Enter ${fieldType}`,
            required: false
          };
          lastColumn.elements.push(newElement);
          commit(newSchema, { ...selection, selectedElementId: newElement.id });
        }
      }
    }
  };

  const addSection = () => {
    const newSchema = JSON.parse(JSON.stringify(schema));
    const newSection: Section = {
      id: `section-${Date.now()}`,
      title: 'New Section',
      rows: [
        {
          id: `row-${Date.now()}`,
          columns: [
            {
              id: `col-${Date.now()}`,
              width: 12,
              elements: []
            }
          ]
        }
      ]
    };
    newSchema.sections.push(newSection);
    commit(newSchema, { selectedSectionId: newSection.id });
  };

  const addRow1 = () => {
    if (!selection.selectedSectionId) return;
    const newSchema = JSON.parse(JSON.stringify(schema));
    const section = newSchema.sections.find((s: Section) => s.id === selection.selectedSectionId);
    if (section) {
      section.rows.push({
        id: `row-${Date.now()}`,
        columns: [{ id: `col-${Date.now()}`, width: 12, elements: [] }]
      });
      commit(newSchema);
    }
  };

  const addRow2 = () => {
    if (!selection.selectedSectionId) return;
    const newSchema = JSON.parse(JSON.stringify(schema));
    const section = newSchema.sections.find((s: Section) => s.id === selection.selectedSectionId);
    if (section) {
      section.rows.push({
        id: `row-${Date.now()}`,
        columns: [
          { id: `col-${Date.now()}`, width: 6, elements: [] },
          { id: `col-${Date.now()}`, width: 6, elements: [] }
        ]
      });
      commit(newSchema);
    }
  };

  const addRow3 = () => {
    if (!selection.selectedSectionId) return;
    const newSchema = JSON.parse(JSON.stringify(schema));
    const section = newSchema.sections.find((s: Section) => s.id === selection.selectedSectionId);
    if (section) {
      section.rows.push({
        id: `row-${Date.now()}`,
        columns: [
          { id: `col-${Date.now()}`, width: 4, elements: [] },
          { id: `col-${Date.now()}`, width: 4, elements: [] },
          { id: `col-${Date.now()}`, width: 4, elements: [] }
        ]
      });
      commit(newSchema);
    }
  };

  const updateElementLabel = (elementId: string, label: string) => {
    const newSchema = JSON.parse(JSON.stringify(schema));
    newSchema.sections.forEach((section: Section) => {
      section.rows.forEach((row: Row) => {
        row.columns.forEach((column: Column) => {
          const element = column.elements.find((e: Element) => e.id === elementId);
          if (element) {
            element.label = label;
          }
        });
      });
    });
    commit(newSchema);
  };

  const updateMeta = (updates: Partial<TemplateSchema['meta']>) => {
    const newSchema = JSON.parse(JSON.stringify(schema));
    newSchema.meta = { ...newSchema.meta, ...updates };
    commit(newSchema);
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    const newSchema = JSON.parse(JSON.stringify(schema));
    const section = newSchema.sections.find((s: Section) => s.id === sectionId);
    if (section) {
      section.title = title;
      commit(newSchema);
    }
  };

  const removeElement = (elementId: string) => {
    const currentSchema = JSON.parse(JSON.stringify(schema));
    const newSchema = JSON.parse(JSON.stringify(schema));
    newSchema.sections.forEach((section: Section) => {
      section.rows.forEach((row: Row) => {
        row.columns.forEach((column: Column) => {
          const index = column.elements.findIndex((e: Element) => e.id === elementId);
          if (index !== -1) {
            column.elements.splice(index, 1);
          }
        });
      });
    });
    commit(newSchema, { ...selection, selectedElementId: undefined });
    setToast({ 
      message: 'Element deleted',
      onUndo: () => {
        commit(currentSchema, selection);
        setToast(null);
      }
    });
    setTimeout(() => setToast(null), 5000);
  };

  const removeSection = (sectionId: string) => {
    const currentSchema = JSON.parse(JSON.stringify(schema));
    const newSchema = JSON.parse(JSON.stringify(schema));
    const index = newSchema.sections.findIndex((s: Section) => s.id === sectionId);
    if (index !== -1) {
      newSchema.sections.splice(index, 1);
      commit(newSchema, {});
      setToast({ 
        message: 'Section deleted',
        onUndo: () => {
          commit(currentSchema, selection);
          setToast(null);
        }
      });
      setTimeout(() => setToast(null), 5000);
    }
  };

  const duplicateElement = (elementId: string) => {
    const newSchema = JSON.parse(JSON.stringify(schema));
    newSchema.sections.forEach((section: Section) => {
      section.rows.forEach((row: Row) => {
        row.columns.forEach((column: Column) => {
          const element = column.elements.find((e: Element) => e.id === elementId);
          if (element) {
            const duplicated: Element = {
              ...JSON.parse(JSON.stringify(element)),
              id: `elem-${Date.now()}`,
              key: `${element.key}_copy_${Date.now()}`
            };
            const index = column.elements.findIndex((e: Element) => e.id === elementId);
            column.elements.splice(index + 1, 0, duplicated);
            commit(newSchema, { ...selection, selectedElementId: duplicated.id });
            setToast({ message: 'Element duplicated' });
            setTimeout(() => setToast(null), 3000);
            return;
          }
        });
      });
    });
  };

  const duplicateSection = (sectionId: string) => {
    const newSchema = JSON.parse(JSON.stringify(schema));
    const section = newSchema.sections.find((s: Section) => s.id === sectionId);
    if (section) {
      const duplicated: Section = JSON.parse(JSON.stringify(section));
      duplicated.id = `section-${Date.now()}`;
      duplicated.title = `${section.title} (Copy)`;
      duplicated.rows = duplicated.rows.map((row: Row) => ({
        ...row,
        id: `row-${Date.now()}`,
        columns: row.columns.map((col: Column) => ({
          ...col,
          id: `col-${Date.now()}`,
          elements: col.elements.map((el: Element) => ({
            ...el,
            id: `elem-${Date.now()}`,
            key: `${el.key}_copy_${Date.now()}`
          }))
        }))
      }));
      const index = newSchema.sections.findIndex((s: Section) => s.id === sectionId);
      newSchema.sections.splice(index + 1, 0, duplicated);
      commit(newSchema, { selectedSectionId: duplicated.id });
      setToast({ message: 'Section duplicated' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const copyElement = () => {
    if (selection.selectedElementId) {
      const element = selectedSection?.rows
        .flatMap(r => r.columns)
        .flatMap(c => c.elements)
        .find(e => e.id === selection.selectedElementId);
      if (element) {
        setClipboard({ type: 'element', data: element });
        setToast({ message: 'Element copied' });
        setTimeout(() => setToast(null), 3000);
      }
    } else if (selection.selectedSectionId) {
      const section = schema.sections.find(s => s.id === selection.selectedSectionId);
      if (section) {
        setClipboard({ type: 'section', data: section });
        setToast({ message: 'Section copied' });
        setTimeout(() => setToast(null), 3000);
      }
    }
  };

  const pasteElement = () => {
    if (!clipboard) return;
    const newSchema = JSON.parse(JSON.stringify(schema));
    
    if (clipboard.type === 'section') {
      const duplicated: Section = JSON.parse(JSON.stringify(clipboard.data));
      duplicated.id = `section-${Date.now()}`;
      duplicated.title = `${clipboard.data.title} (Copy)`;
      duplicated.rows = duplicated.rows.map((row: Row) => ({
        ...row,
        id: `row-${Date.now()}`,
        columns: row.columns.map((col: Column) => ({
          ...col,
          id: `col-${Date.now()}`,
          elements: col.elements.map((el: Element) => ({
            ...el,
            id: `elem-${Date.now()}`,
            key: `${el.key}_copy_${Date.now()}`
          }))
        }))
      }));
      newSchema.sections.push(duplicated);
      commit(newSchema, { selectedSectionId: duplicated.id });
      setToast({ message: 'Section pasted' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const canPaste = clipboard !== null;

  const getFieldIcon = (type: FieldType) => {
    const fieldType = FIELD_TYPES.find(ft => ft.type === type);
    return fieldType?.icon || Type;
  };

  const canMoveUp = () => {
    if (selection.selectedSectionId) {
      const idx = schema.sections.findIndex(s => s.id === selection.selectedSectionId);
      return idx > 0;
    }
    if (selection.selectedElementId) {
      for (const s of schema.sections) {
        for (const r of s.rows) {
          for (const c of r.columns) {
            const idx = c.elements.findIndex(e => e.id === selection.selectedElementId);
            if (idx >= 0) return idx > 0;
          }
        }
      }
    }
    return false;
  };

  const canMoveDown = () => {
    if (selection.selectedSectionId) {
      const idx = schema.sections.findIndex(s => s.id === selection.selectedSectionId);
      return idx >= 0 && idx < schema.sections.length - 1;
    }
    if (selection.selectedElementId) {
      for (const s of schema.sections) {
        for (const r of s.rows) {
          for (const c of r.columns) {
            const idx = c.elements.findIndex(e => e.id === selection.selectedElementId);
            if (idx >= 0) return idx < c.elements.length - 1;
          }
        }
      }
    }
    return false;
  };

  const moveUp = () => {
    if (selection.selectedSectionId) {
      const idx = schema.sections.findIndex(s => s.id === selection.selectedSectionId);
      if (idx > 0) {
        const newSchema = JSON.parse(JSON.stringify(schema));
        const [moved] = newSchema.sections.splice(idx, 1);
        newSchema.sections.splice(idx - 1, 0, moved);
        commit(newSchema);
      }
    } else if (selection.selectedElementId) {
      const newSchema = JSON.parse(JSON.stringify(schema));
      for (const section of newSchema.sections) {
        for (const row of section.rows) {
          for (const column of row.columns) {
            const idx = column.elements.findIndex(e => e.id === selection.selectedElementId);
            if (idx > 0) {
              const [moved] = column.elements.splice(idx, 1);
              column.elements.splice(idx - 1, 0, moved);
              commit(newSchema);
              return;
            }
          }
        }
      }
    }
  };

  const moveDown = () => {
    if (selection.selectedSectionId) {
      const idx = schema.sections.findIndex(s => s.id === selection.selectedSectionId);
      if (idx >= 0 && idx < schema.sections.length - 1) {
        const newSchema = JSON.parse(JSON.stringify(schema));
        const [moved] = newSchema.sections.splice(idx, 1);
        newSchema.sections.splice(idx + 1, 0, moved);
        commit(newSchema);
      }
    } else if (selection.selectedElementId) {
      const newSchema = JSON.parse(JSON.stringify(schema));
      for (const section of newSchema.sections) {
        for (const row of section.rows) {
          for (const column of row.columns) {
            const idx = column.elements.findIndex(e => e.id === selection.selectedElementId);
            if (idx >= 0 && idx < column.elements.length - 1) {
              const [moved] = column.elements.splice(idx, 1);
              column.elements.splice(idx + 1, 0, moved);
              commit(newSchema);
              return;
            }
          }
        }
      }
    }
  };

  const handleNavigate = (type: string, id: string) => {
    if (type === 'section') {
      setSelection({ selectedSectionId: id });
    } else if (type === 'element') {
      setSelection({ ...selection, selectedElementId: id });
    }
  };

  const updateElementProps = (elementId: string, props: Record<string, any>) => {
    const newSchema = JSON.parse(JSON.stringify(schema));
    newSchema.sections.forEach((section: Section) => {
      section.rows.forEach((row: Row) => {
        row.columns.forEach((column: Column) => {
          const element = column.elements.find((e: Element) => e.id === elementId);
          if (element) {
            element.props = { ...element.props, ...props };
          }
        });
      });
    });
    commit(newSchema);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F4F6F8]">
      <DemoHeader 
        title="Template Builder" 
        subtitle="Form Templates"
        onReset={onReset}
        extraActions={
          <TourButton
            onStart={tour.startTour}
            hasCompleted={tour.hasCompleted}
          />
        }
      />
      <DemoTour
        demoId="template-builder"
        run={tour.run}
        stepIndex={tour.stepIndex}
        onStepChange={tour.setStepIndex}
        onComplete={tour.markCompleted}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Toolbox - Left Panel */}
        <div className="w-[280px] bg-white border-r border-slate-200 flex-shrink-0 overflow-y-auto" data-tour="template-builder-toolbox">
          <div className="p-3 border-b border-slate-100">
            <div className="text-xs font-semibold text-slate-600 mb-2">Load Template</div>
            <select 
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-100 outline-none"
              onChange={(e) => {
                const template = SAMPLE_TEMPLATES.find(t => t.meta.name === e.target.value);
                if (template) {
                  const newSchema = JSON.parse(JSON.stringify(template)); // Deep copy
                  commit(newSchema);
                  setSelection({});
                }
              }}
              value={schema.meta.name}
            >
              {SAMPLE_TEMPLATES.map(t => (
                <option key={t.meta.name} value={t.meta.name}>{t.meta.name}</option>
              ))}
            </select>
          </div>
          <div className="p-3">
            <div className="text-xs font-semibold text-slate-600 mb-2 mt-2">Fields</div>
            <div className="flex flex-wrap gap-2">
              {FIELD_TYPES.map(field => {
                const Icon = field.icon;
                return (
                  <button
                    key={field.type}
                    onClick={() => addFieldToSelection(field.type)}
                    className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 flex items-center gap-2 transition-colors"
                  >
                    <Icon className="w-3 h-3" />
                    <span>{field.label}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="text-xs font-semibold text-slate-600 mb-2 mt-4">Layout</div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={addSection}
                className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 flex items-center gap-2 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Section</span>
              </button>
              <button
                onClick={addRow1}
                className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 transition-colors"
              >
                Row (1 col)
              </button>
              <button
                onClick={addRow2}
                className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 transition-colors"
              >
                Row (2 cols)
              </button>
              <button
                onClick={addRow3}
                className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 transition-colors"
              >
                Row (3 cols)
              </button>
            </div>
          </div>
        </div>

        {/* Canvas - Center Panel */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white" data-tour="template-builder-canvas">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 bg-white" data-tour="template-builder-toolbar">
            <Breadcrumbs selection={selection} onNavigate={handleNavigate} />
            <div className="flex items-center gap-2">
              <button
                onClick={undo}
                disabled={!canUndo}
                className={`px-2.5 py-1.5 rounded-sm text-xs font-medium transition-colors ${
                  canUndo 
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                    : 'bg-slate-50 text-slate-400 cursor-not-allowed'
                }`}
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-3 h-3" />
              </button>
              <button
                onClick={redo}
                disabled={!canRedo}
                className={`px-2.5 py-1.5 rounded-sm text-xs font-medium transition-colors ${
                  canRedo 
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                    : 'bg-slate-50 text-slate-400 cursor-not-allowed'
                }`}
                title="Redo (Ctrl+Y)"
              >
                <Redo2 className="w-3 h-3" />
              </button>
              <div className="w-3" />
              <button
                onClick={() => setSelection({})}
                className="px-2.5 py-1.5 rounded-sm text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                title="Clear Selection (Esc)"
              >
                Clear
              </button>
              <div className="w-3" />
              <button
                onClick={copyElement}
                className="px-2.5 py-1.5 rounded-sm text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                title="Copy (Ctrl+C)"
              >
                <Copy className="w-3 h-3" />
              </button>
              <button
                onClick={pasteElement}
                disabled={!canPaste}
                className={`px-2.5 py-1.5 rounded-sm text-xs font-medium transition-colors ${
                  canPaste 
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                    : 'bg-slate-50 text-slate-400 cursor-not-allowed'
                }`}
                title="Paste (Ctrl+V)"
              >
                <Clipboard className="w-3 h-3" />
              </button>
              <div className="w-3" />
              <button
                onClick={moveUp}
                disabled={!canMoveUp()}
                className={`px-2.5 py-1.5 rounded-sm text-xs font-medium transition-colors ${
                  canMoveUp() 
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                    : 'bg-slate-50 text-slate-400 cursor-not-allowed'
                }`}
                title="Move Up (Alt+↑)"
              >
                <ArrowUp className="w-3 h-3" />
              </button>
              <button
                onClick={moveDown}
                disabled={!canMoveDown()}
                className={`px-2.5 py-1.5 rounded-sm text-xs font-medium transition-colors ${
                  canMoveDown() 
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                    : 'bg-slate-50 text-slate-400 cursor-not-allowed'
                }`}
                title="Move Down (Alt+↓)"
              >
                <ArrowDown className="w-3 h-3" />
              </button>
              <div className="w-3" />
              <button
                onClick={() => {
                  if (selection.selectedElementId) {
                    duplicateElement(selection.selectedElementId);
                  } else if (selection.selectedSectionId) {
                    duplicateSection(selection.selectedSectionId);
                  }
                }}
                className="px-2.5 py-1.5 rounded-sm text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                title="Duplicate (Ctrl+D)"
              >
                Duplicate
              </button>
              <button
                onClick={() => {
                  if (selection.selectedElementId) {
                    removeElement(selection.selectedElementId);
                  } else if (selection.selectedSectionId) {
                    removeSection(selection.selectedSectionId);
                  }
                }}
                className="px-2.5 py-1.5 rounded-sm text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                title="Delete (Del)"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              <div className="w-3" />
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className={`px-2.5 py-1.5 rounded-sm text-xs font-medium transition-colors ${
                  previewMode 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Eye className="w-3 h-3 inline mr-1" />
                {previewMode ? 'Edit' : 'Preview'}
              </button>
            </div>
          </div>

          {/* Canvas Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {schema.sections.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Start Building Your Template</h3>
                <p className="text-sm text-slate-600 mb-6 max-w-md">
                  Add a section from the toolbox to begin creating your form
                </p>
                <button
                  onClick={addSection}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors"
                >
                  + Add Section
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {schema.sections.map((section) => (
                  <div
                    key={section.id}
                    className={`border rounded-lg p-4 transition-all ${
                      selection.selectedSectionId === section.id
                        ? 'border-blue-500 bg-blue-50/30'
                        : 'border-slate-200 bg-white'
                    }`}
                    onClick={() => {
                      setSelection({ selectedSectionId: section.id });
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                        className="text-base font-semibold text-slate-900 bg-transparent border-none outline-none focus:bg-white focus:border focus:border-blue-300 focus:px-2 focus:py-1 focus:rounded-sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-slate-100 rounded-sm">
                          <GripVertical className="w-4 h-4 text-slate-400" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSection(section.id);
                          }}
                          className="p-1.5 hover:bg-red-100 rounded-sm text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {section.rows.map((row) => (
                        <div key={row.id} className="flex gap-3">
                          {row.columns.map((column) => (
                            <div
                              key={column.id}
                              className="flex-1"
                              style={{ flex: column.width }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelection({ 
                                  selectedSectionId: section.id,
                                  selectedColumnId: column.id 
                                });
                              }}
                            >
                              <div className="space-y-2">
                                {column.elements.map((element) => {
                                  const Icon = getFieldIcon(element.type);
                                  return (
                                    <div
                                      key={element.id}
                                      className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                                        selection.selectedElementId === element.id
                                          ? 'border-blue-500 bg-blue-50'
                                          : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                                      }`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelection({ 
                                          selectedSectionId: section.id,
                                          selectedColumnId: column.id,
                                          selectedElementId: element.id 
                                        });
                                      }}
                                    >
                                      <div className="flex items-center gap-2 mb-2">
                                        <Icon className="w-4 h-4 text-slate-500" />
                                        <input
                                          type="text"
                                          value={element.label}
                                          onChange={(e) => updateElementLabel(element.id, e.target.value)}
                                          className="text-sm font-medium text-slate-900 bg-transparent border-none outline-none flex-1 focus:bg-white focus:border focus:border-blue-300 focus:px-2 focus:py-1 focus:rounded-sm"
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                        {element.required && (
                                          <span className="text-xs text-red-500">*</span>
                                        )}
                                      </div>
                                      {previewMode ? (
                                        <div className="mt-2">
                                          {element.type === 'text' && (
                                            <input
                                              type="text"
                                              placeholder={element.placeholder}
                                              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                                              disabled
                                            />
                                          )}
                                          {element.type === 'textarea' && (
                                            <textarea
                                              placeholder={element.placeholder}
                                              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                                              rows={3}
                                              disabled
                                            />
                                          )}
                                          {element.type === 'select' && (
                                            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" disabled>
                                              <option>Select an option</option>
                                              {element.options?.map((opt, idx) => (
                                                <option key={idx}>{opt.label}</option>
                                              ))}
                                            </select>
                                          )}
                                          {element.type === 'checkbox' && (
                                            <label className="flex items-center gap-2">
                                              <input type="checkbox" disabled />
                                              <span className="text-sm text-slate-600">{element.label}</span>
                                            </label>
                                          )}
                                        </div>
                                      ) : (
                                        <div className="text-xs text-slate-500 italic">
                                          {element.type} field
                                          {element.placeholder && ` • ${element.placeholder}`}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                                {column.elements.length === 0 && (
                                  <div className="p-3 rounded-lg border-2 border-dashed border-slate-300 text-center text-xs text-slate-400">
                                    Drop fields here or click a field type in the toolbox
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Properties Panel - Right Panel */}
        <div className="w-[340px] bg-white border-l border-slate-200 flex-shrink-0 overflow-y-auto" data-tour="template-builder-properties">
          <div className="p-3">
            <div className="text-sm font-bold text-slate-900 mb-2">Properties</div>
            
            {!selectedSection && !selectedElement && (
              <p className="text-xs text-slate-500 mb-4">
                Select a field, column, row or section to edit its properties.
              </p>
            )}

            {/* Template Meta */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 mb-3">
              <div className="text-xs font-bold text-slate-900 mb-2">Template</div>
              <input
                type="text"
                value={schema.meta.name}
                onChange={(e) => updateMeta({ name: e.target.value })}
                placeholder="Template name"
                className="w-full px-2 py-2 border border-slate-200 rounded-sm text-xs text-slate-900 mb-2"
              />
              <input
                type="text"
                value={schema.meta.description || ''}
                onChange={(e) => updateMeta({ description: e.target.value })}
                placeholder="Description"
                className="w-full px-2 py-2 border border-slate-200 rounded-sm text-xs text-slate-900"
              />
            </div>

            {/* Section Properties */}
            {selectedSection && (
              <div className="bg-white border border-slate-200 rounded-lg p-3 mb-3">
                <div className="text-xs font-bold text-slate-900 mb-2">Section</div>
                <input
                  type="text"
                  value={selectedSection.title}
                  onChange={(e) => updateSectionTitle(selectedSection.id, e.target.value)}
                  placeholder="Section title"
                  className="w-full px-2 py-2 border border-slate-200 rounded-sm text-xs text-slate-900"
                />
              </div>
            )}

            {/* Element Properties */}
            {selectedElement && (
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <div className="text-xs font-bold text-slate-900 mb-2">Field</div>
                <input
                  type="text"
                  value={selectedElement.label}
                  onChange={(e) => updateElementLabel(selectedElement.id, e.target.value)}
                  placeholder="Field label"
                  className="w-full px-2 py-2 border border-slate-200 rounded-sm text-xs text-slate-900 mb-2"
                />
                <input
                  type="text"
                  value={selectedElement.placeholder || ''}
                  onChange={(e) => updateElementProps(selectedElement.id, { placeholder: e.target.value })}
                  placeholder="Placeholder"
                  className="w-full px-2 py-2 border border-slate-200 rounded-sm text-xs text-slate-900 mb-2"
                />
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedElement.required || false}
                    onChange={(e) => updateElementProps(selectedElement.id, { required: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label className="text-xs text-slate-700">Required</label>
                </div>
                {(selectedElement.type === 'select' || selectedElement.type === 'multiselect' || selectedElement.type === 'radio') && (
                  <div className="mt-2">
                    <label className="text-xs text-slate-600 mb-1 block">Options (comma separated)</label>
                    <input
                      type="text"
                      value={selectedElement.options?.map(o => o.label).join(', ') || ''}
                      onChange={(e) => {
                        const options = e.target.value.split(',').map(o => o.trim()).filter(Boolean).map(x => ({ label: x, value: x }));
                        updateElementProps(selectedElement.id, { options });
                      }}
                      placeholder="Option 1, Option 2, Option 3"
                      className="w-full px-2 py-2 border border-slate-200 rounded-sm text-xs text-slate-900"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          onUndo={toast.onUndo}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
};
