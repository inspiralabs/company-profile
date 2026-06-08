"use client";

import { AnimatePresence, motion } from "framer-motion";
import FormSection from "@/components/contact/FormSection";
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
          <select
            id={`${prefix}tipe`}
            required
            className={contactInputClass}
            value={value.tipeKlien}
            onChange={(e) => handleTipeChange(e.target.value as TipeKlien)}
          >
            {TIPE_KLIEN_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <AnimatePresence mode="wait">
          {usesDetailTextareaOnly(value.tipeKlien) ? (
            <motion.div
              key="detail-textarea"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
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
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div>
                <label htmlFor={`${prefix}detail`} className="text-sm font-medium">
                  {detailLabel}
                </label>
                <select
                  id={`${prefix}detail`}
                  className={contactInputClass}
                  value={value.detailTipe ?? ""}
                  onChange={(e) =>
                    onChange({
                      ...value,
                      detailTipe: e.target.value,
                      detailTipeLainnya:
                        e.target.value === DETAIL_LAINNYA
                          ? value.detailTipeLainnya
                          : "",
                    })
                  }
                >
                  <option value="">— pilih jika ingin —</option>
                  {detailOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <AnimatePresence>
                {showDetailLainnya && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
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
