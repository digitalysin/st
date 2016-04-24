DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: hashirama
--

CREATE SEQUENCE categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE categories_id_seq OWNER TO hashirama;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: hashirama; Tablespace: 
--

CREATE TABLE categories (
    id bigint DEFAULT nextval('categories_id_seq'::regclass) NOT NULL,
    name text,
    created_at date,
    updated_at date
);


ALTER TABLE categories OWNER TO hashirama;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: hashirama
--

CREATE SEQUENCE products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE products_id_seq OWNER TO hashirama;

--
-- Name: products; Type: TABLE; Schema: public; Owner: hashirama; Tablespace: 
--

CREATE TABLE products (
    id bigint DEFAULT nextval('products_id_seq'::regclass) NOT NULL,
    name text,
    color text,
    size text,
    price double precision,
    category_id bigint,
    created_at date,
    updated_at date
);


ALTER TABLE products OWNER TO hashirama;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: hashirama
--

COPY categories (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hashirama
--

SELECT pg_catalog.setval('categories_id_seq', 1, false);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: hashirama
--

COPY products (id, name, color, size, price, category_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hashirama
--

SELECT pg_catalog.setval('products_id_seq', 1, false);


--
-- Name: categories_pkey; Type: CONSTRAINT; Schema: public; Owner: hashirama; Tablespace: 
--

ALTER TABLE ONLY categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: products_pkey; Type: CONSTRAINT; Schema: public; Owner: hashirama; Tablespace: 
--

ALTER TABLE ONLY products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: hashirama
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM hashirama;
GRANT ALL ON SCHEMA public TO hashirama;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

TRUNCATE TABLE categories;
TRUNCATE TABLE products;

