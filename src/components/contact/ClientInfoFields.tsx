"use client";

import { AnimatePresence, motion } from "framer-motion";
import FormSection from "@/components/contact/FormSection";
import MotionSelect from "@/components/ui/motion-select";
import {
  contactInputClass,
  DETAIL_LAINNYA,
  getDetailTipeFieldLabel,
  getInstansiLabel,
  TIPE_KLIEN_DETAIL_OPTIONS,
  TIPE_KLIEN_OPTIONS,
  usesDetailTextareaOnly,
  type ClientInfo,
  type TipeKlien,
} from "@/lib/contact";

type ClientInfoFieldsProps = {
  value: ClientInfo;
  onChange: (value: ClientInfo) => void;
  idPrefix?: string;
};

export default function ClientInfoFields({
  value,
  onChange,
  idPrefix = "",
}: ClientInfoFieldsProps) {
  const prefix = idPrefix ? `${idPrefix}-` : "";
  const instansiLabel = getInstansiLabel(value.tipeKlien);
  const detailLabel = getDetailTipeFieldLabel(value.tipeKlien);
  const detailOptions = TIPE_KLIEN_DETAIL_OPTIONS[value.tipeKlien];
  const showDetailLainnya =
    value.detailTipe === DETAIL_LAINNYA && !usesDetailTextareaOnly(value.tipeKlien);
  const showDetailDropdown =
    !usesDetailTextareaOnly(value.tipeKlien) && detailOptions.length > 0;

  const set = <K extends keyof ClientInfo>(key: K, val: ClientInfo[K]) => {
    onChange({ ...value, [key]: val });
  };

  const handleTipeChange = (tipe: TipeKlien) => {
    onChange({
      ...value,
      tipeKlien: tipe,
      detailTipe: "",
      detailTipeLainnya: "",
    });
  };

  return (
    <div className="space-y-8">
      <FormSection title="Identitas Anda">
        <div>
          <label htmlFor={`${prefix}nama`} className="text-sm font-medium">
            Nama Lengkap *
          </label>
          <input
            id={`${prefix}nama`}
            required
            className={contactInputClass}
            placeholder="Masukkan nama lengkap Anda"
            value={value.nama}
            onChange={(e) => set("nama", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${prefix}tipe`} className="text-sm font-medium">
            Tipe *
          </label>
          <MotionSelect
            id={`${prefix}tipe`}
            required
            value={value.tipeKlien}
            onChange={(v) => handleTipeChange(v as TipeKlien)}
            options={TIPE_KLIEN_OPTIONS.map((o) => ({
              value: o.value,
              label: o.label,
            }))}
            placeholder="Pilih tipe"
          />
        </div>

        <AnimatePresence mode="wait">
          {usesDetailTextareaOnly(value.tipeKlien) ? (
            <motion.div
              key="detail-textarea"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, pointerEvents: "none" }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <label htmlFor={`${prefix}profil`} className="text-sm font-medium">
                {detailLabel}
              </label>
              <textarea
                id={`${prefix}profil`}
                rows={2}
                className={contactInputClass}
                placeholder="Contoh: Koperasi simpan pinjam, rumah sakit swasta, ..."
                value={value.detailTipeLainnya ?? ""}
                onChange={(e) => set("detailTipeLainnya", e.target.value)}
              />
            </motion.div>
          ) : showDetailDropdown ? (
            <motion.div
              key={`detail-${value.tipeKlien}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, pointerEvents: "none" }}
              transition={{ duration: 0.25 }}
              className="space-y-4 overflow-hidden"
            >
              <div>
                <label htmlFor={`${prefix}detail`} className="text-sm font-medium">
                  {detailLabel}
                </label>
                <MotionSelect
                  id={`${prefix}detail`}
                  value={value.detailTipe ?? ""}
                  onChange={(v) =>
                    onChange({
                      ...value,
                      detailTipe: v,
                      detailTipeLainnya:
                        v === DETAIL_LAINNYA ? value.detailTipeLainnya : "",
                    })
                  }
                  placeholder="— Pilih Opsi —"
                  options={[
                    { value: "", label: "— Pilih Opsi —" },
                    ...detailOptions.map((o) => ({
                      value: o.value,
                      label: o.label,
                    })),
                  ]}
                />
              </div>

              <AnimatePresence>
                {showDetailLainnya && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0, pointerEvents: "none" }}
                    className="overflow-hidden"
                  >
                    <label
                      htmlFor={`${prefix}detail-lain`}
                      className="text-sm font-medium"
                    >
                      Keterangan lainnya
                    </label>
                    <input
                      id={`${prefix}detail-lain`}
                      className={contactInputClass}
                      placeholder="Jelaskan secara singkat"
                      value={value.detailTipeLainnya ?? ""}
                      onChange={(e) => set("detailTipeLainnya", e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </FormSection>

      <FormSection
        title="Organisasi"
        hint="Opsional — boleh dikosongkan"
      >
        <div>
          <label htmlFor={`${prefix}instansi`} className="text-sm font-medium">
            {instansiLabel}
          </label>
          <input
            id={`${prefix}instansi`}
            className={contactInputClass}
            placeholder="— jika ada —"
            value={value.namaInstansi ?? ""}
            onChange={(e) => set("namaInstansi", e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${prefix}jabatan`} className="text-sm font-medium">
              Jabatan / Posisi
            </label>
            <input
              id={`${prefix}jabatan`}
              className={contactInputClass}
              placeholder="Contoh: Manager IT"
              value={value.jabatan ?? ""}
              onChange={(e) => set("jabatan", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${prefix}kota`} className="text-sm font-medium">
              Kota
            </label>
            <input
              id={`${prefix}kota`}
              className={contactInputClass}
              placeholder="Contoh: Jakarta"
              value={value.kota ?? ""}
              onChange={(e) => set("kota", e.target.value)}
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Kontak">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${prefix}wa`} className="text-sm font-medium">
              Nomor WhatsApp *
            </label>
            <input
              id={`${prefix}wa`}
              required
              type="tel"
              className={contactInputClass}
              placeholder="08xx xxxx xxxx"
              value={value.whatsapp}
              onChange={(e) => set("whatsapp", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${prefix}email`} className="text-sm font-medium">
              Email
            </label>
            <input
              id={`${prefix}email`}
              type="email"
              className={contactInputClass}
              placeholder="nama@email.com"
              value={value.email ?? ""}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
}
